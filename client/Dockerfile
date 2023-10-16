FROM node

WORKDIR /app

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh
RUN ./entrypoint.sh

CMD [ "tail", "-f", "/dev/null" ]