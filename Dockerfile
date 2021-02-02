FROM  node:12.16.1 as base

FROM  node:12.16.1 as publish
WORKDIR /app
COPY    . .
RUN   npm install
RUN   npm run build

FROM base AS final
WORKDIR /var/www
COPY --from=publish /app/dist dist
COPY --from=publish /app/node_modules node_modules
ENV   PORT=8000
ENV   NODE_PATH=dist/
EXPOSE ${PORT}
ENTRYPOINT [ "node", "./dist/index.js" ]