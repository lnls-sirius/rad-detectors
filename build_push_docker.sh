docker-compose -f docker-compose.yml build

docker push ghcr.io/lnls-sirius/rad-det-backend:1.0.0
docker push ghcr.io/lnls-sirius/rad-det-frontend:1.0.0
