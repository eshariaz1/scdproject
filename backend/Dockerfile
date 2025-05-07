# Step 1: Build the backend image
FROM node:18 AS backend

WORKDIR /app

# Copy package.json and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY backend/ .

# Expose port 5000 for backend
EXPOSE 5000

# Start the backend app
CMD ["node", "server.js"]
