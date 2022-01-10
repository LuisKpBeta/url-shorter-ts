FROM node:14
workdir /encurtador
COPY ./package.json ./
COPY ./prisma/ ./prisma/
RUN npm install --only=prod
COPY ./dist ./dist