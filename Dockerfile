FROM node:16-alpine as build
 
RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.5-alpine as release

WORKDIR /usr/share/nginx/html/

COPY --from=build /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



