FROM golang

WORKDIR /app


RUN go install github.com/cosmtrek/air@latest

# RUN COPY go.mod go.sum ./
# RUN go mod download
COPY . .

COPY .env.prod .env

RUN air init

CMD ["air", "-c", ".air.toml"]

# RUN air init

