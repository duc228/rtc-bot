FROM python:3.10

WORKDIR /app

RUN pip install --upgrade pip

RUN pip install rasa

COPY . .

RUN rasa train nlu

USER 1001

CMD rasa run --enable-api --cors="*" & rasa run actions