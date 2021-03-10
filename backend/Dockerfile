FROM node:14-alpine as builder

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

RUN npm install pm2 -g
CMD [ "pm2-runtime", "npm", "--", "start" ]
