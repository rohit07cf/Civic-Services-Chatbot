call E:\worksapces\RND\Respondbot\rasa_env_11_11\botenv\Scripts\activate.bat
python -m rasa_nlu.train -d data/training_nlu.json -c nlu_model_config.yml -o models  --project free --verbose
