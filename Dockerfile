FROM node:24-alpine

WORKDIR /app

COPY package*.json .

RUN npm i && \
    npm cache clean --force

COPY . .

CMD ["npm", "run", "watch"]