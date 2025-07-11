# ---- Stage 1: Build the app ----
    FROM node:20-alpine AS build
    

    # Set working directory inside the container
    WORKDIR /app
    
    # Copy dependency definitions
    COPY package.json yarn.lock ./
    
    # Install dependencies
    RUN yarn install
    
    # Copy all project files
    COPY . .
    
    # Build the production-ready static files
    RUN yarn build
    
    # ---- Stage 2: Serve with NGINX ----
    FROM nginx:alpine
    
    # Copy built static files from the previous stage
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Copy custom NGINX config for SPA routing
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port 80 for the container
    EXPOSE 80
    
    # Start NGINX in foreground mode
    CMD ["nginx", "-g", "daemon off;"]
    