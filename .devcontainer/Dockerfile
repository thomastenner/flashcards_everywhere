FROM node:18
RUN apt-get update && apt-get install -y python3-pip
RUN useradd -m -s /bin/bash -u 1001 dev
RUN npm install -g next@latest
USER dev
WORKDIR /workspace