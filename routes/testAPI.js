const { request } = require("../app");
var fs = require('fs');
var express = require("express");
var router=express.Router();
var path = require('path');

const myPath = "C:\\Users\\y-tit\\OneDrive\\PROJECT3\\100g";

CDren=(tle)=>{
    var file = fs.readdirSync(tle)
    var temp = []
    file.forEach((test) => {
        var newpath = path.join(tle,test)
        if(fs.lstatSync(newpath).isDirectory()==true){
            var tempobject = {
                title: path.basename(newpath),
                path:newpath,
                children: CDren(newpath)
            }
            temp.push(tempobject)
        }
        else{
            var tempobject ={
                title: path.basename(newpath),
                path:newpath
            }
            temp.push(tempobject)
        }
    })
    return temp;
}

var data = [{
    title: path.basename(myPath),
    path:myPath,
    children: CDren(myPath)
}]

router.get('/image',function(req,res,next){
    let temppath = req.url.split("=")[1].replace(/%5C/g,"/")
    if(fs.lstatSync(temppath).isDirectory()==true){
        res.send("notpic")
    }else{
        let data = fs.readFileSync(temppath)
        let tempdata = new Buffer.from(data).toString('base64')
        res.send(tempdata)
    }
})

console.log("Success!!")
router.get("/",function(req,res,next) {
    res.send(data)
});

module.exports=router;