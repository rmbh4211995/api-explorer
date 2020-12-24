FROM node:12.16.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000

RUN npm run build

CMD [ "npm", "start" ]