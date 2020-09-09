### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# TODO fix to be in dist without couchbase subdir
COPY --from=build /usr/src/app/dist/couchbase/ /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
