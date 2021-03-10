FROM node:12.16.3
RUN mkdir -p /home/project
WORKDIR /home/project
COPY . /home/project
RUN npm install
EXPOSE 50002
CMD ["npm", "run", "server"]

