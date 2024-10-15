# 1. 構建階段
FROM node:16.20.2-alpine AS build
WORKDIR /app


# 這些文件包含項目的依賴包信息。
COPY package*.json ./

# 安裝項目的依賴包。
RUN npm install

# 將本地的所有項目文件複製到容器的工作目錄。
COPY . .

# 生成生產環境構建。構建後的靜態資源會被放在 dist/bookproject 目錄中。
RUN npm run build --prod

# 2. 運行階段
FROM nginx:alpine

# 將 NGINX 配置檔複製到容器中
COPY ./nginx.conf.template /etc/nginx/templates/nginx.conf.template

# 複製 Angular 應用的構建結果到 NGINX 提供的靜態文件夾
COPY --from=build /app/dist/first-angular-app /usr/share/nginx/html

# 對外暴露端口（Cloud Run會傳遞環境變數PORT）
EXPOSE 8080

# 使用 envsubst 替換 nginx.conf 中的 $PORT，然後啟動 NGINX
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
