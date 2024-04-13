# Google Login Web Application

This is a web application that utilizes the Google Login or local login to authenticate users to access their personal profile. After login, users can make posts that will show up in the profile page.

## Description

The backend side utilizes `Express` as the framework for `Node.js`, and `passport.js` as the authenticate middleware. Local login will be encrypted using `bcrypt`, and storage using `MongoDB`. `ejs` will be used to render the web application.

## Getting Started

### Clone Project
```bash
git clone https://github.com/william199612/Udemy_Project7_GoogleLogin.git
```

### Installation

```bash
npm install
```

### Executing Program

> Before running the program, you will have to get a Google Login API key from Google.
> [Google - Setting up API keys](https://support.google.com/googleapi/answer/6158862?hl=en).

```bash
nodemon
```

or

```bash
node index.js
```

The server should now be running locally on port 8080 by default.

## Dependencies

The project utilizes the following dependencies:

- bcrypt: Password hashing library.
- connect-flash: Flash messages middleware for Express.
- dotenv: Loads environment variables from a .env file.
- ejs: Templating engine for rendering HTML templates.
- express: Web application framework for Node.js.
- mongoose: MongoDB object modeling tool.
- passport: Authentication middleware for Node.js.

## Contribution

This project is learned from Udemy Course.
["2024 Full Stack Web Development" by Wilson Ren](https://www.udemy.com/course/wilson-full-stack-web-development/)

## License

[ISC](https://choosealicense.com/licenses/isc/)