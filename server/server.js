const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const userController = require('./controllers/userController');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const favicon = require('serve-favicon')
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3100;


// serve the favicon
app.use(favicon(path.join(__dirname, './images', 'favicon.png')));


// connect to database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  });
}

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


// app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(cookieSession({
  name: 'skills-grid',
  keys: ['key1', 'key2']
}));


// Auth0 authentication routes
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    idpLogout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
  })
);

app.get('/', (req, res) => {
  console.log('AUTH?', req.oidc.isAuthenticated(), req.oidc.user?.sub);
  res.send(req.oidc.isAuthenticated() ? 'You are logged in!' : 'You are logged out!');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
});


// route to find user, or create if not found
app.get('/user', requiresAuth(), userController.findOrCreateUser, (req, res) => {
  res.send(res.locals.user);
});


// routes for getting and updating skills array
app.get('/user-skills', requiresAuth(), userController.getUserSkills, (req, res) => {
  // console.log('BODY', res.locals.skills);
  res.status(200).json(res.locals.skills);
});

app.put('/user-skills', requiresAuth(), userController.updateUserSkills, (req, res) => {
  res.sendStatus(200);
});


app.use('*', (req,res) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('An error has occurred!');
});


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

module.exports = app;