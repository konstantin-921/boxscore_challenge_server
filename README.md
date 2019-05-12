# Express Redis Docker app

Requirements: [Docker Community Edition](https://www.docker.com/community-edition) and [Docker Compose](https://docs.docker.com/compose/install/)

To start the app run: `docker-compose up` or `sudo docker-compose up`

It will then be started on port 4444

# Endpoints

## Fetching Data

```sh
curl http://localhost:4444/api/games
```