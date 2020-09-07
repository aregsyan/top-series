FROM node:current

RUN npm install typescript pm2 -g
RUN pm2 install typescript

WORKDIR /app
ADD src /app/src
ADD package.json tsconfig.json /app/
RUN mkdir -p /var/log/top-series
RUN npm install
#RUN npm run tsc

CMD pm2 start --no-daemon ./src/main.ts --watch -o /var/log/top-series/top-series.log -e /var/log/top-series/top-series.err
#CMD sleep 2000