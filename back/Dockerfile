FROM node:16.14.2-bullseye-slim
WORKDIR /app 
COPY package*.json /app
RUN yarn
COPY . /app
EXPOSE 5001
CMD [ "yarn", "start" ]


