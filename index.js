const express = require("express");

const app = express();
app.use(express.json());

const posts = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
];
app.get("/posts/", (req, res) => {
  try {
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/posts/:id", (req, res) => {
  try {
    const post = posts.find((post) => post.id == parseInt(req.params.id));
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send("post not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.delete("/posts/:id", (req, res) => {
  try {
    const index = posts.findIndex((post) => post.id == parseInt(req.params.id));
    console.log(index);
    if (index != -1) {
      const post = posts.filter((post) => post.id != parseInt(req.params.id));
      res.status(200).send(post);
    } else {
      res.status(404).send("post not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.put("/posts/:id", (req, res) => {
  try {
    const index = posts.findIndex((post) => post.id == parseInt(req.params.id));
    console.log(index);
    console.log(req.body);
    if (index != -1) {
      if (req.body.title != "" && req.body.body != "") {
        const updatedPosts = posts.map((post) => {
          if (post.id == parseInt(req.params.id)) {
            const updatedPost = req.body;
            return { ...post, ...updatedPost };
          }
          return post;
        });

        res.status(200).send(updatedPosts);
      } else {
        res.status(400).send("bad request");
      }
    } else {
      res.status(404).send("post not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.post("/posts/", (req, res) => {
  try {
    if (req.body) {
      posts.push(req.body);
      res.status(200).send(posts);
    } else {
      res.status(400).send("bad request");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(5000, () => {
  console.log("listnning on port 5000...");
});
