require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {PORT} = process.env;
const {getAllPosts,  getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts');
const {login, register} = require('./controllers/auth');
const {isAuthenticated} = require('./middleware/isAuthenticated');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', register);
app.post('/login', login);
app.get('/posts', getAllPosts);
app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

app.listen(PORT, () => console.log(`sync successful & server running on port ${PORT}`))
