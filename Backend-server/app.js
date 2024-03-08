const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes')
const cors = require('cors');
const sendResponse = require('./middleware/sendResponse');
const { errorConverter, errorHandler } = require('./middleware/error');
const path = require('path');
// const session = require('express-session');

const app = express();

// app.use(
//   session({
//     secret: 'QDw^d2+qu/!2?~Uf',
//     saveUninitialized: false,
//     resave: false,
//   })
// );


mongoose.connect(
  "mongodb+srv://anghann29:Nikunj@cluster0.b3maiqj.mongodb.net/TravelConnect?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(sendResponse);

app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, '../public')));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(passport.session());

app.use('/v1', routes);
app.use(errorConverter);
// handle error
app.use(errorHandler);

app.listen(3333,()=>{

    console.log("**** Server is listening at port 3333 !!!! ***")
})
