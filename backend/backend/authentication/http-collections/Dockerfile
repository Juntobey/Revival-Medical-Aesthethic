# Use an official Node.js runtime as the base image
FROM node:latest
# Set the working directory in the container
WORKDIR /usr/src/appointments
# Copy package.json and package-lock.json to the container
COPY package*.json ./

COPY ./database/init.sql /docker-entrypoint-initdb.d/

# Install application dependencies
RUN npm install
# Copy the rest of the application code
COPY . .

EXPOSE 3035

# Specify the command to run your application
CMD ["npm", "run" , "start"]