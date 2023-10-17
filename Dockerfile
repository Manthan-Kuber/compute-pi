FROM node:20-alpine3.17

COPY package.json /app/
COPY part_1.txt /app/
COPY part_2.txt /app/
COPY random.txt /app/
COPY src /app/

WORKDIR /app

RUN npm install

CMD ["node","app.js"]