# Use Node.js base image
FROM node:23.8

# Set the working directory inside the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json (if exists) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the collection file and the script into the container
COPY . .

# Install Newman and other dependencies
RUN npm install -g newman


RUN npm install newman

# Command to run the Node.js script when the container starts
#CMD ["node", "postman.js"]
CMD while true; do echo "Running..."; sleep 1000;done

