FROM node:14.19.0-alpine3.14 AS ui-build
WORKDIR /usr/src/scheduler
COPY . .
ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm install && npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.

COPY --from=ui-build /usr/src/scheduler/dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 1000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
