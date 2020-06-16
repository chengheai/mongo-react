FROM node:9.0-alpine
RUN mkdir -p /home/project
WORKDIR /home/project
COPY . /home/project
RUN npm install
EXPOSE 10002
CMD ["npm", "run", "server"]

