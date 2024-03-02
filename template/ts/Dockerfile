FROM node:18-alpine
RUN mkdir /opt/app
COPY . /opt/app
WORKDIR /opt/app
RUN yarn install --frozen-lockfile
RUN yarn global add pm2@latest
CMD ["pm2-runtime", "src/index.js"]