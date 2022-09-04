# FROM node:10-alpine
# ADD . /app
# WORKDIR /app

# # Npm
# RUN npm config set registry http://r.npm.taobao.org/ && \ 
#     npm config set sass_binary_site http://npm.taobao.org/mirrors/node-sass/ && \
#     npm i

# # RUN npm run build
# CMD ["npm", "run", "build"]
# # Yarn
# # RUN yarn config set registry https://registry.npm.taobao.org && \
# #     yarn global add @tarojs/cli && \
# #     yarn

# # EXPOSE 3000
# #执行构建
# # CMD ["npm", "run", "start"]


FROM node:10-alpine
ADD . /app
WORKDIR /app

# Npm
RUN npm config set registry http://r.npm.taobao.org/ && \ 
    npm config set sass_binary_site http://npm.taobao.org/mirrors/node-sass/ && \
    npm i

RUN npm run build

FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
COPY --from=0 /app/nginx.conf /etc/nginx/conf.d/default.conf

