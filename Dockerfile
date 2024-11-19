# Stage 1: Build the React frontend
FROM node:18 AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Stage 2: Set up the Node.js backend
FROM node:18
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install
COPY backend ./backend

# Copy the built React frontend to the backend's public folder
COPY --from=build /app/frontend/build ./backend/public

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["node", "backend/entrypoint.js"]
