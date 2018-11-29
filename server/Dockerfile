FROM node:10-alpine
COPY . /home/app
WORKDIR /home/app
RUN yarn install --frozen-lockfile
RUN yarn build
CMD ["yarn", "start"]