//use to initialize the database
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "Aarav",
    to: "Ananya",
    msg: "Assignment complete ho gaya?",
    created_at: new Date(),
  },
  {
    from: "Ishaan",
    to: "Diya",
    msg: "Kal movie dekhne chaloge?",
    created_at: new Date(),
  },

  {
    from: "Kavya",
    to: "Vihaan",
    msg: "Mummy ne tiffin mein parathe diye hain, share karein?",
    created_at: new Date(),
  },
  {
    from: "Reyansh",
    to: "Saanvi",
    msg: "Code review karoge mere pull request ka?",
    created_at: new Date(),
  },
  {
    from: "Aditi",
    to: "Arjun",
    msg: "Meeting 3 baje shifted hai, sabko inform kar dijiye",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
