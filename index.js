const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const gsecRoutes = require('./routes/gsecRoutes')
const assistantRegistrarRoutes = require('./routes/gsecRoutes')
const guardRoutes = require('./routes/gsecRoutes')
const facultyMentorRoutes = require('./routes/gsecRoutes')
const systemAdministratorRoutes = require('./routes/gsecRoutes')
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

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());



connectDB();
app.use('/auth', authRoutes);
app.use('/facultyMentor', facultyMentorRoutes);
app.use('/gsec', gsecRoutes);
app.use('/guard', guardRoutes);
app.use('/systemAdministrator', systemAdministratorRoutes);
app.use('/assistantRegistrarRoutes', assistantRegistrarRoutes);

app.listen(9000, () => {
    console.log("connected!");
});