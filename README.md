# Friendly

Make friends! :) with new social network app!

## Details

The app is based on MERN stack `MongoDB + Express.js + Node.js + React.js`

Used libraries

- server `nodemon, bcrypt, body-parser, cors, dotenv,express,gridfs-stream, helmet, jsonwebtoken, mongoose, morgan, multer ,multer-gridfs-storage`
- client `mui, dotenv, formik, yup react-dropzone, react-redux, redux-persist, @reduxjs/toolkit`

## Usage

`clone repo`

- server `cd server` `npm i` `npm start`
- client `cd client` `npm i` `npm start`

- email - dimchev@gmail.com
- password - dimchev123

## Features

- light/dark mode
- mobile responsive
- like posts
- make friends
- users

## User

### Logged out

- view posts
- view post detais
- view user profile
- view user friends
- login, register

### Logged in

- create a post
- edit and delete post if is owner
- like a post
- make and remove friends

## Architecture

### User
- firstName: String
- lastName: String
- email - unique: String
- password: String
- picturePath: String
- friends: Array
- location: String
- occupation: String
- viewedProfile: Number
- impressions: Number

### Post 
- userId: String
- firstName: String
- lastName: String
- location: String
- description: String
- picturePath: String
- userPicturePath: String
- likes: Map
- comments: Array

One user can create many posts, can have many friends (add and remove them), have unique email, hashed password;
One post has userId that is id ot it's owner, likes which is Map (userId for key, and true for value, this is if user like the post);