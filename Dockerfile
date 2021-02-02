FROM  node:12.16.1
WORKDIR /var/www
COPY    . .
RUN   npm install
RUN   npm run build
ENV   PORT=8000
EXPOSE ${PORT}
ENTRYPOINT [ "node", "./dist/index.js" ]