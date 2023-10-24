FROM golang

WORKDIR /app

# RUN go install github.com/cosmtrek/air@latest
# RUN air init

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh
RUN ./entrypoint.sh

CMD ["tail", "-f", "/dev/null"]