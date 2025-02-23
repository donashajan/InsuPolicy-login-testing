# Step 1: Use a base image with Node.js
FROM node:23.8

# Step 2: Install dependencies for Chrome and Selenium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    curl \
    unzip \
    libgconf-2-4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    lsb-release \
    libcurl4-openssl-dev \
    --no-install-recommends

# Step 3: Install Chrome and ChromeDriver
RUN curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o google-chrome.deb && \
    dpkg -i google-chrome.deb || apt-get install -f -y && \
    rm google-chrome.deb

# Step 4: Set the working directory
WORKDIR /app

# Step 5: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 6: Copy the test scripts
COPY . .

# Step 7: Command to run the test script
CMD ["node", "/app/selenium-web-testing/login.js"]
#CMD while true; do echo "Running..."; sleep 100;done
