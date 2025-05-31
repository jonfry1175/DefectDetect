FROM node:18-alpine

WORKDIR /app

# Copy package.json dan package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server files
COPY server/ ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=2222

# Expose port
EXPOSE 2222

# Start the server
CMD ["npm", "start"]