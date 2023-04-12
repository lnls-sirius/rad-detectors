FROM python:3.11-alpine3.16

# General information about the code
LABEL maintainer="SwC <swc@lnls.br>"

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

EXPOSE 80
CMD [ "flask", "run", "--host", "10.30.1.63", "--port", "80"]
