# Koa MongoDB Template

A Koa template with all the cool things you need.

## Requirements
* Node 16
* Yarn
* MongoDB

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
* **PORT**: port in which the app will run (defaults to 3000).

## Tools and packages
This template comes with different tools that you will definetly love:
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) to hash user passwords.
* [Dotenv](https://github.com/motdotla/dotenv) to read .env files.
* [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/) to check for syntax errors and enforce a common code style.
* [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) to generate auth tokens.
* [Koa](https://koajs.com/) to run the server and manage requests.
* [Prisma](https://www.prisma.io/) to to facilitate the use of MongoDB.
* [Yup](https://github.com/jquense/yup) to validate data.

## Using Prisma

To able to use Prisma correctly, every time you make a change to your schema file, run:
```bash
yarn prisma generate
````
to update your prisma client code.

## CI
This project is configured with [GitHub Actions](https://github.com/features/actions) so that each pull request is checked for eslint offenses.
