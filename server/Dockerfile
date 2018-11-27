# ref: https://github.com/MichalZalecki/docker-compose-node-postgres
FROM node:10-alpine
# EXPOSE 3000 8080
COPY . /home/app
WORKDIR /home/app
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]