FROM ubuntu:20.04


WORKDIR /app


# Update APT packages - Base Layer
RUN apt-get update \
  && apt-get upgrade --yes \
  && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends --yes \
    supervisor curl certbot gnupg wget \
    gettext \
    python3-pip python3-requests python-setuptools \
  && wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | apt-key add - \
  && apt-get remove --yes python3-pip

# Install MongoDB v5.0.14, Redis, NodeJS - Service Layer, PostgreSQL v13
RUN curl --silent --show-error --location https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - \
  && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list \
  && curl --silent --show-error --location https://deb.nodesource.com/setup_16.x | bash - \
#   && echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list \
#   && curl --silent --show-error --location https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \ 
  && apt update \
  && apt-get install --no-install-recommends --yes mongodb-org=5.0.14 nodejs build-essential \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*


# Clean up cache file - Service tech@appsmith.comlayer
RUN rm -rf \
    /root/.cache \
    /root/.npm \
    /root/.pip \
    /usr/local/share/doc \
    /usr/share/doc \
    /usr/share/man \
    /var/lib/apt/lists/* \
    /tmp/*


# Define volumes - Service Layer
VOLUME [ "/stacks" ]

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8000

CMD service mongod start && npm start
