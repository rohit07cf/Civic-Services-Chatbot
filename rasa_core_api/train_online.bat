@rem call E:\worksapces\RND\Respondbot\rasa_core_11_3\chatbot-env\Scripts\activate.bat
@rem python -m rasa_core.train --online  -d domain_freetext.yml -s data/stories.md   -u freeText/ --endpoints endpoints.yml    --out stories_interactive.md --epoch 10 -c default_config.yml 
python -m rasa_core.train interactive  -d domain_freetext.yml -s data/stories.md -o models/current/dialogue -c default_config.yml  --out stories_interactive.md
