FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Set default container port
ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]

