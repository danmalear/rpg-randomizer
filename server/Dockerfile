# We use node:22 as the base for building and installing dependencies.
FROM node:22 AS build

WORKDIR /usr/src/app

ENV NODE_OPTIONS="--dns-result-order=ipv4first"

# Copy package.json and package-lock.json first to leverage Docker caching
# If these files don't change, subsequent builds can skip 'npm install'
COPY package*.json ./

RUN npm install

# Copy the rest of the application source code
COPY . .

ENV PORT=3000
EXPOSE $PORT

# Run the application using the non-root user
USER node

# Command to start application
CMD [ "node", "src/server.ts" ]
