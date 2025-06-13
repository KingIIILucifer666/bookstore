FROM node:18
WORKDIR /app

COPY . .

# RUN npm config set registry https://registry.npmmirror.com
RUN npm install

CMD ["npx", "nx", "serve", "server"]
EXPOSE 5000
