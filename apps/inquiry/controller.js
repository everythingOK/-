/**
 * Created by renzhaotian on 16-5-6.
 */
fs=require("fs");

fs.open("./abc","a",0777,function(e,fd){
    fs.write(fd,"1hang\n",0,"utf-8",function(e){
        fs.close(fd)
    })
})
fs.open("./abc","a",0777,function(e,fd){
    fs.write(fd,"2hang\n",0,"utf-8",function(e){
        fs.close(fd)
    })
})