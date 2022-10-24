# Koa MongoDB Template

A Koa template with all the cool things you need.

## Requirements
* Node 16
* Yarn
* MongoDB
* Redis
* SMTP credentials

## Setup
First of all, make a copy of this project by clicking on **"Use this template"**.

Now that you have your own repository, clone it and install its dependencies:
```bash
yarn install
```

Create a .env file using the .env.example file as a template:
```
cp .env.example .env
```
and fill the necessary variables.

Finally, run your app:
```bash
yarn start # or yarn start:dev
```
and visit http://localhost:3000/ (you can change the port by changing the `PORT` variable in your .env file).

## Environment
There are some variables your are **required** to use for this template to work:
* **APP_NAME**: name of the app you are building (defaults to Koa MongoDB Starter).
* **DATABASE_URL**: url of your MongoDB service.
* **JWT_SECRET**: secret used to generate auth tokens.
* **JWT_EXPIRATION**: expiration time for auth tokens (tokens don't expire by default).
* **MAILER_SMTP_HOST**: the host runnning your smtp service.
* **MAILER_SMTP_PORT**: the port in which is running your smtp service.
* **MAILER_SMTP_USERNAME**: your smtp username.
* **MAILER_SMTP_PASSWORD**: your smtp password.
* **MAILER_SENDER**: address used to send emails.
* **PORT**: port in which the app will run (defaults to 3000).
* **REDIS_HOST**: host in which your redis service is running (defaults to localhost).
* **REDIS_PORT**: port in which your redis service is running (defaults to 6379).

## Tools and packages
This template comes with different tools that you will definetly love:
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) to hash user passwords.
* [Bull](https://github.com/OptimalBits/bull) to work with queues (reason you need Redis).
* [Dotenv](https://github.com/motdotla/dotenv) to read .env files.
* [EJS](https://github.com/mde/ejs) to create dynamic templates for emails.
* [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/) to check for syntax errors and enforce a common code style.
* [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) to generate auth tokens.
* [Koa](https://koajs.com/) to run the server and manage requests.
* [Nodemailer](https://nodemailer.com/about/) to send emails.
* [Prisma](https://www.prisma.io/) to to facilitate the use of MongoDB.
* [Yup](https://github.com/jquense/yup) to validate data.

## Using Prisma

To able to use Prisma correctly, every time you make a change to your schema file, run:
```bash
yarn prisma generate
````
to update your prisma client code.

## Deploy
This project is configured with a [Procfile](./Procfile) to be able to run in Heroku. Also, with every deploy, you don't have to worry about generating a production build first, because it is already taken care of by the `heroku-postbuild` command defined in the **package.json** file.

## CI
This project is configured with [GitHub Actions](https://github.com/features/actions) so that each pull request is checked for eslint offenses.
