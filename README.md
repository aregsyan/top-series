# top-series
Simple top-series service using TMDB API

Prerequirements:
  1. Docker
  2. make
  
  
**How it works:**
  It service for searching top episodes using TMDB API. It consists from 2 continers: application and database(Mongodb). The last works as cache.  
**How to Start**  
For running the service:  
  Simple:
  1. Add in .env file the BEARER_TOKEN `TWITTER_BEARER_TOKEN=your bearer token`
  2. Just run `make run`
  
  Optionaly advenced:
    The database path `DB_PATH` by default is in `./mongodb` and mounted to container. It is possible to overwrite by doing `make run DB_PATH=your path to db`  
    Same is with logs `LOG_PATH` by default is in `./logs` which is also mounted in containers(db and app). It is possible to overwrite by doing `make run LOG_PATH=your path to logs`
    
 Other useful commands:  
    `make stop` stopping the containers  
    `make clean` stopping and deleting stopped and dangling containers  
  
  
 **THE API**
 
  `GET /topEpisodes/:seriesId` returns the top episodes for specified series
  `GET /analytics/popularSeries` returns the metrics for series accessed via API.


