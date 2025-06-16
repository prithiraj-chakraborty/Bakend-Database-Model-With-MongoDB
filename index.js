const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");
const port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


 main().then(()=>{
     console.log("Connection successfull with MongoDB");
 }).catch(err => console.log(err));

 async function main(){
     await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
 }

app.get("/",(req,res)=>{
      try {
        res.render("main.ejs");
    } catch (err) {
        console.error("Render error:", err);
        res.send("Error rendering page.");
    }
})
 app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
     try {
     res.render("chats.ejs",{chats});
     } catch (err) {
         console.error("Render error:", err);
         res.send("Error rendering page.");
     }
 });

 app.get("/chats/new",(req,res)=>{
        res.render("new.ejs");
     });

app.post("/chats",(req,res)=>{
    let {from,to, msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date(),
    });
    newChat.save().then((res)=>{
        console.log(res);
    }).catch(err=> console.log(err));
    res.redirect("/chats");
});   
app.get("/chats/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("editform.ejs",{chat});
});
app.put("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let {msg: newMsg}= req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true});
    res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.listen(8080, ()=>{
    console.log("App is listning to this port 8080");
});
