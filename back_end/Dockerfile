FROM python:3.8

# General information about the code
LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt

EXPOSE 8080
CMD [ "flask", "run", "--host", "0.0.0.0", "--port", "8080"]
