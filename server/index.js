require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {PORT} = process.env;
const {getAllPosts,  getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts');
import {register, login} from "./controllers/auth"
const {isAuthenticated} = require('./middleware/isAuthenticated');
import { sequelize } from './util/database';
import {user} from './models/user'
import {post} from './models/posts'

const app = express();
app.use(express.json());
app.use(cors());

user.hasMany(post);
post.belongsTo(user);

app.post('/register', register);
app.post('/login', login);
app.get('/posts', getAllPosts);
app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

sequelize.sync().then(() => {

    app.listen(PORT, () => console.log(`sync successful & server running on port ${PORT}`))
}).catch((error) => {
    console.log(error)
})

