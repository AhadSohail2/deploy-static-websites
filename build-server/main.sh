#!/bin/bash

# Check if GIT_REPOSITORY__URL is set
if [ -z "$GIT_REPOSITORY_URL" ]; then
    echo "Error: GIT_REPOSITORY__URL is not set."
    exit 1
fi

# Clone the repository
git clone "$GIT_REPOSITORY_URL" /home/app/output
if [ $? -ne 0 ]; then
    echo "Error: Failed to clone the repository."
    exit 1
fi

# Execute the Node.js script
exec node script.js
