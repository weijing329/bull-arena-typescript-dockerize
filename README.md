# Bull & Anera using Typescript & Docker
This project demostrates integration of [Bull](https://github.com/OptimalBits/bull) & [Arena](https://github.com/mixmaxhq/arena) using Typescript & Docker.

There are three main services in this solution:
  1. redis, data store for the queues
  2. arena, Web GUI for monitoring queues 
  3. server, a bull test application, which create new message every few seconds and send to the queue

## For development
```shell
$ yarn server:install
$ yarn start:dev
```

## Running all services in Docker
```shell
$ yarn start

# rebuild server
$ yarn server:rebuild
```

## Monitoring queues
http://127.0.0.1:4567
