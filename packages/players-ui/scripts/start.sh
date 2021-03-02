#!/bin/bash

if [ "$ENV" = "" ]; then
    echo "[No ENV in env variables] Defaulting to ENV=local"
    export ENV=local
fi

# npm install
webpack serve --open-page .
