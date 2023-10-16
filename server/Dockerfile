FROM node:20-alpine3.17

COPY package.json /app/
COPY ../master_file.txt /app/
COPY src /app/

WORKDIR /app

RUN npm install

CMD ["node","app.js"]