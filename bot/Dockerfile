FROM python:3.10

WORKDIR /app

RUN pip install --upgrade pip

RUN pip install rasa

# CMD tail -f /dev/null

COPY . .

RUN chmod +x entrypoint.sh

CMD rasa run actions & rasa run  --enable-api --cors "*" --debug

# CMD rasa train & rasa run actions & rasa run  --enable-api --cors "*" --debug