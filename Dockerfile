FROM node:14
workdir /encurtador
COPY ./package.json ./
RUN npm install --only=prod
COPY ./dist ./dist