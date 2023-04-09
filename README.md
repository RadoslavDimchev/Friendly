# Friendly <img src="https://user-images.githubusercontent.com/101931596/230755952-171d93ce-758a-4876-a952-76ff49421836.png" alt="favicon" width="50" height="50">

Make friends, :) with new social network app!

## Live Demo - https://friendly-network.onrender.com/

The server and client are deployed on [Render](https://render.com/) 

## Details

The app is based on MERN stack `MongoDB + Express.js + Node.js + React.js`

Used libraries

- server `nodemon, bcrypt, body-parser, cors, dotenv,express,gridfs-stream, helmet, jsonwebtoken, mongoose, morgan, multer ,multer-gridfs-storage`
- client `mui, dotenv, formik, yup react-dropzone, react-redux, redux-persist, @reduxjs/toolkit, @react-google-maps/api, use-places-autocomplete`

## Usage

`clone repo`

- server `cd server` `npm i` `npm start`
- client `cd client` `npm i` `npm start`

- email - dimchev@gmail.com
- password - 12345678

## Features

- light/dark mode
- mobile responsive
- like posts
- make friends
- google maps
- users
- notifications
- tooltips
- loaders
- modals
- not found page
- validation
- prettier config for formatting code

## User

### Logged out!

- view posts
- view post detais
- view user profile
- view user friends
- share post with link
- search posts
- sort posts by likes or recent
- login, register

### Logged in

- create a post
- edit and delete post if is owner
- like a post
- make and remove friends
- comment on post
- logout

## Architecture
![DB diagram](https://user-images.githubusercontent.com/101931596/230755631-e2b8d6b3-9e4b-4b74-b247-91a172c0e875.png)

One user can create many posts, can have many friends (add and remove them), have unique email, hashed password;
One post has userId that is id ot it's owner, likes which is Map (userId for key, and true for value, this is if user like the post);

## Screenshots

![Screenshot (353)](https://user-images.githubusercontent.com/101931596/230756790-01999961-b4e7-47bb-9696-bf1907966fb5.png)
![Screenshot (354)](https://user-images.githubusercontent.com/101931596/230756792-aaec959a-79eb-478d-984e-e974efc42c42.png)
![Screenshot (355)](https://user-images.githubusercontent.com/101931596/230756793-1f553f0c-88b2-4fdb-932f-e475a537795c.png)
![Screenshot (356)](https://user-images.githubusercontent.com/101931596/230756794-fb179bf2-cc5a-4695-905a-a85c58a34239.png)
![Screenshot (357)](https://user-images.githubusercontent.com/101931596/230756797-1ffbdf3c-e59b-49c1-957b-24d429d4cf6f.png)
![Screenshot (358)](https://user-images.githubusercontent.com/101931596/230756787-745cc51b-28cd-426d-94c3-1c0236c03f8f.png)
