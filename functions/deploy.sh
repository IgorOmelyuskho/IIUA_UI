#!/bin/bash

function deploy_image {

REPO=$1
BRANCH=$2
BRAND=$3
VERSION=$4
NAME=$5

# Check params
if [[ -z "$VERSION" ]]; then
    print_error "Build counter not set! Script stopped."
fi

if [[ -z "$BRANCH" ]]; then
    print_error "Deploy branch not set! Script stopped."
fi

if [[ -z "$REPO" ]]; then
    print_error "Docker registry not set! Script stopped."
fi

if [[ -z "$BRAND" ]]; then
    print_error "Brand not set! Script stopped."
fi

if [[ -z "$NAME" ]]; then
    print_error "Brand not set! Script stopped."
fi

# Login to Docker repo
LOGIN_RESULT=`yes | sudo docker login -u root -p iiua2018 $REPO 2>&1 | tail -n1`

if [[ "$LOGIN_RESULT" != "Login Succeeded" ]]; then
    print_error "Login to $REPO is fail: $LOGIN_RESULT"
else
    print_title "Status login to $REPO: $LOGIN_RESULT"
fi

# Check running app count
#RUNNING_APP_COUNT=`docker ps | grep "$BRAND:$VERSION" | wc -l`

#if [[ "$RUNNING_APP_COUNT" != "0" ]]; then
#    print_info "Not app running container of $BRAND:$VERSION , now count is: $RUNNING_APP_COUNT."
#else
#    print_info "Exist of app running container of $BRAND:$VERSION , now count is: $RUNNING_APP_COUNT."
#fi

# Deploy app
docker-compose stop "$BRAND-$BRANCH-$NAME" || EXIT_CODE=$? && true
docker-compose -f ./dockercomposefiles/docker-compose-$BRANCH-$NAME.yml up -d --quiet-pull --force-recreate

# Pull deployed images for local save command
docker pull "$REPO/$BRAND:$BRANCH-$NAME-$VERSION"
}