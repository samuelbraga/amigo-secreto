FROM node:16 as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:16 as app

WORKDIR /app

COPY package.json package.json

COPY package-lock.json package-lock.json

COPY prisma prisma

RUN npm install --production

RUN npm run prisma:generate

COPY --from=build /app/dist .

CMD [ "node", "shared/http/server.js" ]

