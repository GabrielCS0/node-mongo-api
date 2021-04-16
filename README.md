## 📋 About 

This is a simple API that runs on Node.js using MongoDB as database.

## 📑  Features 

### Register new users

Allows users to create an account.

Request body example:

```json
{
	"name": "User Name",
	"email": "user@gmail.com",
	"password": "UserPassword"
}
```

### Authentication

Allows registered users to login.

Request body example:

```json
{
	"email": "user@gmail.com",
	"password": "UserPassword"
}
```

### Forgot Password

Sends an email that allows users to change their password.

Request body example:

```json
{
	"email": "user@gmail.com"
}
```

### Reset Password 

Allows users who have a valid token to change their passwords.

Request body example:

```json
{
	"email": "user@gmail.com",
	"token": "valid-token",
	"password": "NewUserPassword"
}
```

### Create a new Project

Allows users to create new projects.

Request body example:

```json
{
	"title": "Project Title",
	"description": "Project Description",
	"tasks": [
		{
			"title": "New Task",
			"assignedTo": "User ID"
		},
	]
}
```

### List all projects

Allows you to list all projects.

### List One Project

Allows you to list only one specific project.

### Update a project

Allows you to update a project.

Request body example:

```json
{
	"title": "New Project Title",
	"description": "New Project Description",
	"tasks": [
		{
			"title": "New Task",
			"assignedTo": "User ID"
		}
	]
}
```

### Delete a project

Allows you to delete a project.

## 👨‍💻 Technologies used

- Typescript
- Express
- Mongoose
- Bcryptjs
- Nodemailer
- Json Web Token
- Jest

## 📁 How to install

You must have Git, Node.js, MongoDB e Yarn installed.

```bash
# Clone the repository
git clone https://github.com/GabrielCordeiroDev/node-mongo-api

# Enter directory
cd node-mongo-api

# Install project dependencies
yarn

# Start the project
yarn dev
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/GabrielCordeiroDev/node-mongo-api/blob/main/LICENSE) file for details.
