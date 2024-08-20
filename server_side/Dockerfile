# pull official base image
FROM node:16.14.2-alpine

# set working directory
WORKDIR /frontend_side

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend_side/node_modules/.bin:$PATH

# install app dependencies
# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install --silent

# add app
COPY . ./


# RUN npm run build
CMD ["npm", "run", "start"]
