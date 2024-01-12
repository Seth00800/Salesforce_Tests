FROM node:latest

USER root
WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install --verbose

EXPOSE 8004

CMD ["node", "/app/Scripts/NodeJS/src/main/main.mjs"]


