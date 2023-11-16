FROM node as builder

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx

COPY --from=builder /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf

# CMD yarn dev

