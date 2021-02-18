const express = require('express');
const router =express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const connection = require('../db');
router.post("/register",(req,res)=>{
    var password;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err) console.log(err);
        connection.query("INSERT INTO users(username,password) VALUES(?,?);",[req.body.username,hash],(err2,results)=>{
            if(err2) 
            {
                res.json({msg:"Username doesn't exist !"});
            }else{
            res.json({msg:"Registration Success ! Login now !"});
            res.send(results);
            }
        });
    });
    });
    
    
router.post("/login",(req,res)=>{
    connection.query("SELECT * FROM users WHERE username =?",[req.body.username],(err,results)=>{
        if(err) console.log(err);
        if(results.length >0 ){ 
            bcrypt.compare(req.body.password, results[0].password, function(err2, result) {
                if(err2) console.log(err2);
                if(result){
                    res.json({loggedin:true,username:req.body.username});
                }else{
                    res.json({loggedin:false,message:"Invalid Password/Username !"});
                }
            });
           
        }else{
            res.json({loggedin:false,message:"Username doesn't exist !"});
        }
    });
});
router.get("/likes/:username",(req,res)=>{
    const username = req.params.username;
    connection.query("SELECT distinct postid FROM likes WHERE userLiking= ?",username,(err,results)=>{
        if(err) console.log(err);
        res.send(results);

    })
});
module.exports = router;