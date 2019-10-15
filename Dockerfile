### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

ENV Configuration realese

#COPY ./uanext/package.json ./uanext/package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN mkdir /ng-app
WORKDIR /ng-app
COPY . .
WORKDIR /ng-app/uanext
RUN npm ci 

#RUN npm run ng build -- --configuration  echo ${Configuration} --prod --output-path=dist

RUN if [ "$Configuration" = "master" ]; then npm run ng build --configuration  master --prod --output-path=dist; else npm run ng build --configuration  realese --prod --output-path=dist; fi;

### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/uanext/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]


