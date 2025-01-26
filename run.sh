#!/bin/bash
cd Backend
npm install
npm start &
sleep 3
cd ..
xdg-open index.html
echo "Backend started"
echo "opened index.html"
echo "email: sophie.bluel@test.tld"
echo "password: S0phie"