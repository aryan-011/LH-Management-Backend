const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
// const authRoutes = require('./routes/authRoutes')
const gsecRoutes = require('./routes/gsecRoutes')
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
const expressSession = require('express-session')
//middlewares


app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
}));

connectDB();
// app.use('/auth', authRoutes);
// app.get('/protected-route', authenticate, (req, res) => {
//   res.json({ message: 'Access granted to protected route', user: req.user });
// });

app.use('/gsec', gsecRoutes);

app.listen(9000, () => {
    console.log("connected!");
});