FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

CMD [ "node", "dist/main.js" ]