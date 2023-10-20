FROM node:20-alpine3.17

COPY package.json /app/
COPY part_1.txt /app/
COPY part_2.txt /app/
COPY part_3.txt /app/
COPY part_4.txt /app/
COPY part_5.txt /app/
COPY part_6.txt /app/
COPY part_7.txt /app/
COPY part_8.txt /app/
COPY part_9.txt /app/
COPY part_10.txt /app/
COPY part_11.txt /app/
COPY part_12.txt /app/
COPY part_13.txt /app/
COPY part_14.txt /app/
COPY part_15.txt /app/
COPY part_16.txt /app/
COPY random.txt /app/
COPY src /app/

WORKDIR /app

RUN npm install

CMD ["node","app.js"]