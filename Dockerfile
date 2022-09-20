from node:latest

RUN npm install

EXPOSE 5001

CMD ["nodemon", "server.js"]
