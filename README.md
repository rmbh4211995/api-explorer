# Api Explorer

Simple front end to view api endpoints.

## Installation

Use the cmd line to install dependencies.

```
npm install
```

## Usage

```
npm run build
npm run start
```

or with docker-compose for local dev
```
npm run up
```

## Deployment
Add the following to Github -> Settings -> Secrets -> Add Repository Secret

```
AWS_IP=some-ip-address
AWS_KNOWN_HOSTS=rsa-encrypted-host-fingerprints
AWS_SSH_KEY=ssh-key-pair-pem
AWS_USER=ec2-user-name
```

When you push or merge to the branch 'production' the github action will automatically deploy your changes to your AWS EC2 Instance.