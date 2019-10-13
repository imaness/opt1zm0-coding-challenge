# Coding Challenge


## Features

1. Three tier architecture code structure.
2. Unit and Integration testing.
3. ESLint using Airbnb style guide.
4. Docker deployment with  docker compose file.
5. Code style uses some of es2016+ features.
6. Configuration files can be separated for each Deployment environments.
7. Web application requests is served and proxied through NGINX.
8. Compression using gzip.
9. Removed some security vulnerabilities.

## Deployment 

#### Server Requirements: 

To be able  to run and test the application you need to install the following:

1. Docker 
2. Docker Compose
3. Node.js 12 __(Optional for running the tests)__

#### To run the application :

1. Download and build the images

```shell
$ docker-compose build
```

2. Run the containers

```shell
$ docker-compose up 
```

## Testing 

To execute Unit and Integration test:

```
$ npm run test
```

Testing requires Redis to be accessible. To be able to successfully run it, you need to expose redis service TCP port from **"6379"** to **"6379:6379"** in docker-compose.yml file.


## Inspirations:

1. Docker deployment:  https://github.com/DanWahlin/CodeWithDanDockerServices




