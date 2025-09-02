docker stack rm stackdemo
sleep 10
docker volume rm stackdemo_db-data
docker compose build
docker compose push
docker stack deploy --compose-file compose.yaml stackdemo