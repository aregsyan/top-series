LOG_PATH := $(or $(LOGPATH), './top_series_data/logs')
DB_PATH := $(or $(DBPATH), './top_series_data/mongodb')

default: build

build:
	@echo BUILD WEB-DEV
	@LOG_PATH=$(LOG_PATH) DB_PATH=$(DB_PATH) docker-compose -f docker-compose.yml -p top-series build

run: stop build
	@echo START WEB-DEV
	@LOG_PATH=$(LOG_PATH) DB_PATH=$(DB_PATH) docker-compose -f docker-compose.yml -p top-series up --remove-orphans -d

stop:
	@echo STOP WEB-DEV
	@docker stop top-series-app || true && docker rm top-series-app || true
	@docker stop top-series-db || true && docker rm top-series-db || true

clean: stop
	@docker ps -q -f status=exited | while read l; do docker rm $$l; done
	@docker images -q -f dangling=true | while read l; do docker rmi $$l; done
	@docker system prune -f