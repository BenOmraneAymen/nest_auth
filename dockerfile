FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire application source code to the working directory
COPY . .

# Expose the port that your Nest.js application will run on
EXPOSE 3000

# Command to run your Nest.js application
CMD ["npm", "run", "start:prod"]