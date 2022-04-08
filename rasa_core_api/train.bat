@rem --epochs 100 --nlu_threshold 0.4 --core_threshold 0.4 --fallback_action action_fallback --history 1
REM  -m modulr -c config , -o out, -d domain, -s stories , 
python -m rasa_core.train -d domain_freetext.yml -s data/stories.md -o models/current/dialogue -c default_config.yml 