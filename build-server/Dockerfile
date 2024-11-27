FROM ubuntu:focal

# Update and install dependencies
RUN apt-get update && \
    apt-get install -y curl git && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get upgrade -y && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/app

# Copy application files
COPY main.sh script.js package*.json ./

# Install Node.js dependencies
RUN npm install

# Set execute permissions
RUN chmod +x main.sh script.js

# Define entrypoint
ENTRYPOINT ["/home/app/main.sh"]
