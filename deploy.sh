docker stack rm ec2-docker-swarm
sleep 10
docker volume rm ec2-docker-swarm_db-data
docker compose build
docker compose push
docker stack deploy --compose-file compose.yaml ec2-docker-swarm