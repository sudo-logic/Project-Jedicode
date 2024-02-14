# Stage 1: Build the application
FROM node:slim as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Create the production image
FROM node:slim as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

COPY production.env production.env

RUN npm ci --only=production

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
