# Step 1: Build the frontend image
FROM node:18 AS frontend

WORKDIR /frontend

# Copy package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the frontend code
COPY frontend/ .

# Build the React app
RUN npm run build

# Step 2: Serve the React app using a simple web server
FROM nginx:alpine

# Copy the build folder to nginx's default public directory
COPY --from=frontend /frontend/build /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80
