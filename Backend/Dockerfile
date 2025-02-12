FROM node:18-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache python3 make g++ gcc
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5678
CMD ["npm", "start"] 
