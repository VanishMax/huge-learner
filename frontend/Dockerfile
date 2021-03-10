FROM node:14-alpine as builder

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
