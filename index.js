const express = require("express");
const app = express();
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const bodyParser = require("body-parser");
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/user',userRoute);
app.use('/post',postRoute);
app.listen(process.env.PORT || 3001);