FROM node:16 as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:16 as app

WORKDIR /app

COPY --from=build package.json package.json

COPY --from=build package-lock.json package-lock.json

RUN npm install --production

COPY --from=build /app/dist .

CMD [ "node", "shared/http/server.js" ]

