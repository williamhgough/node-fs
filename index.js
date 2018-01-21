/*
 * Set up server and bootstrap start-up survey application
 * @author William Gough
 */

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// Connect the database
mongoose.connect(keys.mlab.connect);

/*
 * ===========================================
 * Bootstrap app & normal/auth routes
 */

const app = express();

// Set middleware
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    }),
);
app.use(passport.initialize());
app.use(passport.session());

// Create default route handler
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Import auth routes
require('./routes/auth')(app);

/*
 * ===========================================
 * Run application on specified port
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
