const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const gsecRoutes = require('./routes/gsecRoutes')
const assistantRegistrarRoutes = require('./routes/assistantRegistrarRoutes')
// const guardRoutes = require('./routes/guardRoutes')
// const facultyMentorRoutes = require('./routes/facultyMentorRoutes')
// const systemAdministratorRoutes = require('./routes/systemAdministratorRoutes')
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
// app.use('/auth', authRoutes);
// app.use('/facultyMentor', facultyMentorRoutes);
// app.use('/gsec', gsecRoutes);
// app.use('/guard', guardRoutes);
// app.use('/systemAdministrator', systemAdministratorRoutes);
app.use('/assistantRegistrar', assistantRegistrarRoutes);

app.listen(9000, () => {
    console.log("connected!");
});