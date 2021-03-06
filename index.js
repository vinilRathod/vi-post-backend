const express = require("express");
const app = express();
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/user',userRoute);
app.use('/post',postRoute);
app.listen(process.env.PORT || 3001);