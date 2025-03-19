# Stage 1: Build the application
FROM node:16-alpine AS builder
WORKDIR /app

# Copy package.json and yarn.lock to install all dependencies (including devDependencies)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Create the production image
FROM node:16-alpine AS runner
WORKDIR /app

# Set the environment variable for production
ENV NODE_ENV production

# Copy the built files and necessary folders from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Install only the production dependencies
RUN yarn install --production --frozen-lockfile

# Expose the port on which the application will run (3000 by default)
EXPOSE 3000

# Command to start the application in production mode
CMD ["yarn", "start"]