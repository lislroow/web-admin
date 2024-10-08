FROM node:20
WORKDIR /app
COPY package.json .
RUN yarn cache clean
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c", "npx serve -l 3100 -s build"]