FROM node:20.10

WORKDIR /api

COPY . .

# RUN rm -rf node_modules

RUN npm install
RUN npm install -g eas-cli

RUN apt-get update && apt-get install -y git
RUN eas login

CMD [ "npm", "start" ]

EXPOSE 8081

# docker build -t faith-battle-front:latest .

# docker run -d -p 8081:8081 --name faith-battle-front faith-battle-front