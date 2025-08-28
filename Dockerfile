FROM nginx:stable-alpine

# Copy frontend build
COPY frontend /usr/share/nginx/html

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf