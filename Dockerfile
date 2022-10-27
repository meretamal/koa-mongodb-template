FROM node:16 AS development

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .
ENV PATH=/usr/src/node_modules/.bin:$PATH

RUN yarn install

WORKDIR /usr/src/app

COPY . .

RUN npx prisma generate

CMD [ "yarn", "start:dev" ]

FROM node:16 AS production

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .

RUN yarn install

WORKDIR /usr/src/app

COPY . .

RUN npx prisma generate

RUN yarn build

CMD [ "yarn", "start:prod" ]
