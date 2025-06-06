const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const { error } = require("console");
const methodOverride = require("method-override");

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//to parse data from client side
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//index route
app.get("/chat", async (req, res) => {
  let chats = await Chat.find(); // to find all collection in db it is a async function
  console.log(chats);
  res.render("index.ejs", { chats });
});

//new route
app.get("/chat/new", (req, res) => {
  res.render("new.ejs");
});

//create route
app.post("/chat", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  console.log(newChat);

  newChat
    .save()
    .then((res) => {
      console.log("data was saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chat");
});

//edit route
app.get("/chat/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id); // this ia a async function
  res.render("edit.ejs", { chat });
});

//update route
app.put("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true },
    { new: true }
  );

  console.log(updateChat);
  res.redirect("/chat");
});

//delete route
app.delete("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let deletChat = await Chat.findByIdAndDelete(id);
  console.log(deletChat);
  res.redirect("/chat");
});

app.get("/", (req, res) => {
  res.send("root working");
});
app.listen(8080, () => {
  console.log("listening on port 8080");
});
