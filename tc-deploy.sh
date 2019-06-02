#!/bin/bash

source ./../functions/utils/output.sh
source ./../functions/deploy.sh

BRANCH=$1
VERSION=$2
NAME=$3

deploy_image "registry.iiua.com.ua:5000" $BRANCH "iiua" $VERSION $NAME