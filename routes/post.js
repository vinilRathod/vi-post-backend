const express = require('express');
const router =express.Router();
const connection = require('../db');
router.post("/",(req,res)=>{
    const title = req.body.title;
    const image = req.body.image;
    const username = req.body.username;
    connection.query("INSERT INTO posts(title,image,username) VALUES(?,?,?);",[title,image,username],(err,results)=>{
        if(err) console.log(err);
        res.send(results);
    });
});

router.get("/",(req,res)=>{
    connection.query("SELECT id,title,image,username,likes,DAY(created) AS day,MONTH(created) AS month,YEAR(created) AS year FROM posts",(err,results)=>{
        if(err) console.log(err);
        res.send(results);
    })
});

router.get("/byUser/:username",(req,res)=>{
    const username = req.params.username;
    connection.query("SELECT id,title,image,username,likes,DAY(created) AS day,MONTH(created) AS month,YEAR(created) AS year FROM posts WHERE username= ?",username,(err,results)=>{
        if(err) console.log(err);
        res.send(results);

    })
});

router.post("/like",(req,res)=>{
    const userLiking = req.body.userLiking;
    const postid = req.body.postid;
    connection.query("INSERT into likes(userLiking,postid) VALUES(?,?)" , [userLiking,postid],(err,results)=>{
        if(err) console.log(err);
    connection.query("UPDATE posts SET likes =likes+1 where id=?",postid,(err2,results2)=>{
        res.send(results);
    })
        
    })
});
module.exports = router;