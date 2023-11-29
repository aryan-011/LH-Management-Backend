const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const gsecRoutes = require('./routes/gsecRoutes')
const assistantRegistrarRoutes = require('./routes/assistantRegistrarRoutes')
const guardRoutes = require('./routes/guardRoutes')
const facultyMentorRoutes = require('./routes/facultyMentorRoutes')
const systemAdministratorRoutes = require('./routes/systemAdministratorRoutes')
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken")
const { connectDB } = require("./config/database");
const expressSession = require('express-session')
var cors = require('cors');
//middlewares

app.use(cors({credentials:true, origin: 'http://localhost:3000'}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,sameSite: 'none', }, // Set to true if using HTTPS
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
app.use('/assistantRegistrar', assistantRegistrarRoutes);

app.get('/api/user', verifyToken, (req, res) => {
    const userData = req.user;  
    res.status(200).json({ user: userData });
  });
  

app.listen(9000, () => {
    console.log("connected!");
});