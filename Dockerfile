# Production Docker image

FROM node:12-stretch

# For security reasons don't run operations as the root user
USER node

RUN mkdir /home/node/assignment_checker

WORKDIR /home/node/assignment_checker

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci


FROM node:12-alpine

# Install OS updates 

RUN apk -U upgrade \
    && echo 'Finished installing dependencies'

USER node

RUN mkdir /home/node/assignment_checker

WORKDIR /home/node/assignment_checker

COPY --from=0 /home/node/assignment_checker/node_modules /home/node/assignment_checker/node_modules

COPY --chown=node:node . .

RUN npm run build && npm run docs:api

ENV NODE_ENV production

CMD ["npm", "start"]
