FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
ENV NODE_PATH=.
CMD [ "npm", "start" ]
