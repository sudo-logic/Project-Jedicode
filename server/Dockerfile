FROM node:14.19.0-alpine3.14 as development

WORKDIR /usr/src/app

COPY . .

RUN rm -rf package-lock.json && npm install && npm run build

EXPOSE 5000

CMD ["npm", "start"]
