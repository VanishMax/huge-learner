# huge-learner
A project for going deep down into full-stack development (and a bit of machine learning)


## Set up

Use docker-compose for the project. Dev environment with hot-reload is used as:

```bash
docker-compose -f docker-compose.dev.yaml up --build
```

The production environment, with full builds and Nginx serving:

```bash
docker-compose -f docker-compose.prod.yaml up --build
```
