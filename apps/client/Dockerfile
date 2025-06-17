FROM node:18
WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install
RUN npx nx build client

EXPOSE 3000
CMD ["npx", "serve", "dist/apps/client"]
