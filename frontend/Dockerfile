# Dockerfile for Frontend
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run tsc
EXPOSE 3000
CMD ["npm","start"]