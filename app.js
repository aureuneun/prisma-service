const express = require("express");
const bodyParser = require("body-parser");
const { prisma } = require("./generated/prisma-client");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const user = await prisma.users();
  res.json(user);
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.posts();
  res.json(posts);
});

app.post("/add-post", async (req, res) => {
  const {
    body: { title },
  } = req;
  const newPost = await prisma.createPost({
    title,
    views: 10,
  });
  console.log(newPost);
  res.redirect(`/post/${newPost.id}`);
});

app.get("/post/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const post = await prisma.post({ id });
  res.json(post);
});

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
