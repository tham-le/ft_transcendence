DOCKER=ft_transcendance-web-1

all: up

exec:
	docker exec -it $(DOCKER) sh

ps:
	docker compose ps

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

stop:
	docker compose stop

clean: stop
	docker system prune -a -f

re: clean all logs

.PHONY: all build up down logs re build