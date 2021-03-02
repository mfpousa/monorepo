#!/bin/bash

if [ "$ENV" = "" ]; then
    echo "[ERROR] No ENV in env variables (must be one of <local|dev|prod>)"
    exit 1
fi

npm install
rm -rf dist
NODE_ENV=production webpack
