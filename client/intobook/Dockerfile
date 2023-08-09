FROM node:latest
WORKDIR /app
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]