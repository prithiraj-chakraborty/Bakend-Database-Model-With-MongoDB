const  mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main().then(()=>{
    console.log("Connection successfull with MongoDB");
}).catch(err => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

Chat.insertMany([
{
     from: "Raju",
     to:"Priyanka",
     msg:"Please send me the video.",
     created_at: new Date(),
 },
 {
    from: "Rohit",
    to: "Manu",
    msg:"Hello",
    created_at: new Date(),
 },
  {
    from: "Kalu",
    to: "saheli",
    msg:"I have teddy",
    created_at: new Date(),
 },
  {
    from: "Ram",
    to: "shyam",
    msg:"Hello brother help me.",
    created_at: new Date(),
 },
  {
    from: "Rocky",
    to: "Mani",
    msg:"hi everyone.",
    created_at: new Date(),
 },
]);
