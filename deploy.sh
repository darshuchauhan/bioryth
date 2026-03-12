#!/bin/bash

cd ~/domains/bioryth.com/public_html

git pull origin main

npm install

npm run build

rm -rf *

cp -r dist/* .
