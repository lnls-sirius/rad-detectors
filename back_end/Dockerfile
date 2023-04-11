FROM python:3.8-alpine

# General information about the code
LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt

EXPOSE 80
CMD [ "flask", "run", "--host", "10.30.1.63", "--port", "80"]
