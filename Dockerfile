FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm install --quiet

COPY . .

RUN node --max-old-space-size=2048 ./node_modules/@angular/cli/bin/ng build --configuration production


FROM nginx:alpine

COPY --from=build /app/dist/base-users-front/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]