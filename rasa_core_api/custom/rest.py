from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import inspect
import json,os,logging,shutil
import datetime, time
from multiprocessing import Queue
from threading import Thread
import threading
from typing import Text, List, Dict, Any, Optional, Callable, Iterable

from flask import Blueprint, jsonify, request, Flask, Response ,send_from_directory
from werkzeug.utils import secure_filename

from rasa_core import utils
from rasa_core.constants import DOCS_BASE_URL
from rasa_core.run import create_argument_parser


try:
    from urlparse import urljoin
except ImportError:
    from urllib.parse import urljoin

from rasa_core.channels.channel import InputChannel,CollectingOutputChannel,UserMessage,QueueOutputChannel
from rasa_core.utils import create_dir_for_file , EndpointConfig ,zip_folder
from rasa_core.train import train_dialogue_model
from rasa_core.remote import RasaCoreClient
logger = logging.getLogger(__name__)

root = os.path.join("RasacoreTrainingData")
arg_parser = create_argument_parser()
cmdline_args = arg_parser.parse_args()
class CRestInput(InputChannel):
    """A custom http input channel.

    This implementation is the basis for a custom implementation of a chat
    frontend. You can customize this to send messages to Rasa Core and
    retrieve responses from the agent."""
    @classmethod
    def name(cls):
        return "crest"


    @staticmethod
    def on_message_wrapper(on_new_message, text, queue, sender_id):
        collector = QueueOutputChannel(queue)

        message = UserMessage(text, collector, sender_id,
                              input_channel=CRestInput.name())
        on_new_message(message)

        queue.put("DONE")

    def _extract_sender(self, req):
        return req.json.get("sender", None)

    # noinspection PyMethodMayBeStatic
    def _extract_message(self, req):
        return req.json.get("message", None)

    
    def stream_response(self, on_new_message, text, sender_id):
        from multiprocessing import Queue

        q = Queue()

        t = Thread(target=self.on_message_wrapper,
                   args=(on_new_message, text, q, sender_id))
        t.start()
        while True:
            response = q.get()
            if response == "DONE":
                break
            else:
                yield json.dumps(response) + "\n"

    
    

    def blueprint(self, on_new_message):
        self.trainingThread = None
        custom_webhook = Blueprint(
                'custom_webhook_{}'.format(type(self).__name__),
                inspect.getmodule(self).__name__)

        @custom_webhook.route("/", methods=['GET'])
        def health():
            return jsonify({"status": "ok"})

        @custom_webhook.route("/webhook", methods=['POST'])
        def receive():
            sender_id = self._extract_sender(request)
            text = self._extract_message(request)
            should_use_stream = utils.bool_arg("stream", default=False)

            if should_use_stream:
                return Response(
                        self.stream_response(on_new_message, text, sender_id),
                        content_type='text/event-stream')
            else:
                collector = CollectingOutputChannel()
                on_new_message(UserMessage(text, collector, sender_id,
                                           input_channel=self.name()))
                return jsonify(collector.messages)

        #return custom_webhook

        @custom_webhook.route("/train", methods=['POST'])
        def train():
            if self.trainingThread is None or not self.trainingThread.isAlive():
                if request.method == 'POST' :
                # check if the post request has the file part
                    if 'domain' not in request.files or "stories" not in request.files:
                        return jsonify({"error":"no files were uploaded"}) 
                    
                    domainyml = request.files['domain']
                    storiesmd = request.files['stories']
                    # if user does not select file, browser also
                    # submit an empty part without filename
                    if domainyml.filename == '' or storiesmd.filename == '':
                        return jsonify({"error":"No selected file "}) 

                    def allowed_file( filename):
                        ALLOWED_EXTENSIONS = set(['yml', 'yaml', 'md'])
                        return '.' in filename and \
                            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
                    

                    def uploadTrainedModal(newTrainedModelLocation):
                        arg_parser = create_argument_parser()
                        cmdline_args = arg_parser.parse_args()

                        print(cmdline_args.port)
                        print(cmdline_args.core)
                        """ Rasa core port """
                        rasa_core_url = "http://localhost:{}".format(cmdline_args.port)
                        endpoint = EndpointConfig(rasa_core_url)
                        rasaCoreClient = RasaCoreClient(endpoint)
                        rasaCoreClient.upload_model(newTrainedModelLocation)
                        if os.path.exists(cmdline_args.core):
                            shutil.rmtree(cmdline_args.core)
                            shutil.copytree(newTrainedModelLocation,cmdline_args.core)
                        
                    if domainyml and allowed_file( domainyml.filename) and storiesmd and allowed_file( storiesmd.filename):
                        trainingFolder = os.path.join(root,"newtraining" )
                        if os.path.exists(trainingFolder):
                            renameFolderName =  trainingFolder + datetime.datetime.fromtimestamp(time.time()).strftime('%Y_%m_%d_%H_%M_%S')
                            logger.info("::::: FORDER ::::: {}".format(renameFolderName))
                            #os.rename(trainingFolder, renameFolderName)
                            modelZip = zip_folder(trainingFolder)
                            shutil.move(modelZip, renameFolderName+".zip")
                            shutil.rmtree(trainingFolder)
                            
                            

                            # shutil.rmtree(trainingFolder)
                        os.mkdir(os.path.join(root,"newtraining" ))
                        domainymlFileLocation = os.path.join(trainingFolder, "domain.yml")
                        storiesmdFileLocation = os.path.join(trainingFolder, "stories.md")
                        newTrainedModelLocation = os.path.join(trainingFolder, "newTrainedModel")
                        domainyml.save(domainymlFileLocation)
                        storiesmd.save(storiesmdFileLocation)
                        domainymlFileLocation = domainymlFileLocation.replace("\\","/")
                        storiesmdFileLocation=storiesmdFileLocation.replace("\\","/")
                        newTrainedModelLocation = newTrainedModelLocation.replace("\\","/")
                        print("domain yml location :{} ".format(domainymlFileLocation))
                        print("stories md location :{} ".format(storiesmdFileLocation))

                        try:
                            train_dialogue_model(domain_file=domainymlFileLocation,#"static/newtraining/domain.yml",
                                stories_file=storiesmdFileLocation,#"static/newtraining/stories.md",
                                output_path=newTrainedModelLocation,#"static/newtraining/model",
                                dump_stories=False,
                                policy_config="default_config.yml")
                        except Exception as e:
                            logger.exception(e)
                            return  jsonify({"message":"rasa core training failed !!!", "staus":False})

                        self.trainingThread = Thread(target=uploadTrainedModal, args=(newTrainedModelLocation,))
                        self.trainingThread.start()
                        '''
                        arg_parser = create_argument_parser()
                        cmdline_args = arg_parser.parse_args()

                        print(cmdline_args.port)
                        """ Rasa core port """
                        rasa_core_url = "http://localhost:{}".format(cmdline_args.port)
                        endpoint = EndpointConfig(rasa_core_url)
                        rasaCoreClient = RasaCoreClient(endpoint)
                        rasaCoreClient.upload_model(newTrainedModelLocation)
                        '''
                        return  jsonify({"message":"rasa core training success", "status": True})
                    else:
                        return  jsonify({"message":"rasa core training failed", "status": False})
                else:
                     return  jsonify({"message":"rasa core training inprogress", "status": False})


        @custom_webhook.route("/static/<path:path>", methods=['GET'])
        def static_file(path):
            print("path :{}".format(path))
            
            
            print(root)
            return send_from_directory(root,path)

        return custom_webhook
