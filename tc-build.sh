#!/bin/bash

source ./../functions/utils/output.sh
source ./../functions/build.sh

BRANCH=$1
VERSION=$2
NAME=$3

build_push_image "registry.iiua.com.ua:5000" $BRANCH "iiua" $VERSION $NAME
