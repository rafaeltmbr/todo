# build
FROM node:lts AS build
WORKDIR /build
COPY .. ./
RUN yarn && yarn build

# run
FROM node:lts
WORKDIR /app

COPY ../package.json ./package.json
RUN yarn

COPY ../production ./production
COPY --from=build /build/dist ./dist

CMD node dist/shared/infra/http/server.js