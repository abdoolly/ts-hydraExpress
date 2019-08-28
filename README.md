# Typescript Hydra Express

This is a simple starter project for using hydra express in typescript

## Prerequisite

to be able run hydra you will need a redis instance so you can use docker for that

first run this command to pull the redis image to your device

```
    docker pull redis
```

then you can start the redis container using this command

```
docker run -p 6379:6379 --name some-redis -d redis
```

now you are good to go

## installation

as the usualy we just need to run

```
    npm install
```

## Run development

you just need to run this command

```
    npm run watch
```

## Run production

for production you just need to run this command

```
    npm run start:prod
```

this will compile the typescript and put it in a folder called `dist/`
then run the app.js file as usual
