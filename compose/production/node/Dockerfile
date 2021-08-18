FROM node:10.16.0

WORKDIR /app
ADD . /app

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN cnpm rebuild node-sass

CMD ["npm", "run", "build"]