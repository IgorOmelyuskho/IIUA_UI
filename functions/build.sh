#!/bin/bash

function build_push_image {

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
    print_error "BRANCH not set! Script stopped."
fi

if [[ -z "$REPO" ]]; then
    print_error "Docker registry not set! Script stopped."
fi

if [[ -z "$BRAND" ]]; then
    print_error "BRANCH not set! Script stopped."
fi

if [[ -z "$NAME" ]]; then
    print_error "BRANCH not set! Script stopped."
fi



# Login to Docker repo
LOGIN_RESULT=`yes | sudo docker login -u root -p iiua2018 "$REPO" 2>&1 | tail -n1`

if [[ "$LOGIN_RESULT" != "Login Succeeded" ]]; then
    print_error "Login to $REPO is fail: $LOGIN_RESULT"
else
    print_title "Status login to $REPO: $LOGIN_RESULT"
fi

# Build & push & clear old data images
IMAGE_VERSION="$REPO/$BRAND:$BRANCH-$NAME-$VERSION"
IMAGE_VERSION_LATEST="$REPO/$BRAND:$BRANCH-$NAME-latest"
docker build -f Dockerfile -t "$IMAGE_VERSION" ./..

## check if docker build is failed
if [[ $? -ne 0 ]]; then
  print_error "Docker build exit code: $?"
else
  print_info "Docker build exit code: $?"
  docker push "$IMAGE_VERSION"
  docker tag "$IMAGE_VERSION" "$IMAGE_VERSION_LATEST"
  docker push "$IMAGE_VERSION_LATEST"

  print_info "Clear images with <none> tag & build $BRAND"
  docker images | grep "none" | awk '{ print $3 }' | xargs docker rmi -f || EXIT_CODE=$? && true
  docker images | grep -v "$BRANCH-$NAME-$VERSION" | awk '{ print $3 }' | xargs docker rmi -f || EXIT_CODE=$? && true
  docker ps -a | grep "Exited" | awk '{print $1}' | xargs docker rm -f || EXIT_CODE=$? && true
fi
}

