const express = require("express");
const app = express();
app.use(express.json());

const superHeroes = [
  {
    name: "Iron Man",
    power: ["money"],
    color: "red",
    isAlive: true,
    age: 46,
    image:
      "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart",
  },
  {
    name: "Thor",
    power: ["electricity", "worthy"],
    color: "blue",
    isAlive: true,
    age: 300,
    image:
      "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg",
  },
  {
    name: "Daredevil",
    power: ["blind"],
    color: "red",
    isAlive: false,
    age: 30,
    image:
      "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg",
  },
];

// ------ MIDDLEWARE ------- \\

app.use((_req, _res, next) => {
  console.log("Request received");
  next();
});

// ------ HEROES ------- \\

app.get("/heroes", (_req, res) => {
  res.json(superHeroes);
});

app.post("/heroes", (req, res) => {
  superHeroes.push(req.body);

  if (req.body.name) {
    req.body.name === req.body.name.toLocaleLowerCase();
  }

  res.send("Ok, hero added!");
});

app.use("/heroes", (req, res, next) => {
  res.json(superHeroes);
});

// ------ HEROES NAME ------- \\

app.get("/heroes/:name", (req, res) => {
  const hero = superHeroes.find((hero) => {
    return (
      req.params.name.toLocaleLowerCase().replace(" ", "-") ===
      hero.name.toLocaleLowerCase().replace(" ", "-")
    );
  });

  if (!hero) {
    return res.json({
      message: "This hero does not exist",
    });
  }
  res.json(hero);
});

// ------ HEROES POWER ------- \\

app.get("/heroes/:name/powers", (req, res) => {
  const hero = superHeros.find(() => {
    return (
      req.params.name.toLocaleLowerCase().replace(" ", "-") ===
      hero.name.toLocaleLowerCase().replace(" ", "-")
    );
  });

  if (!hero) {
    return res.json({
      message: "This hero does not exist",
    });
  }
  res.json(hero.power);
});

app.patch("/heroes/:name/powers", (req, res) => {
  const hero = superHeros.find(() => {
    return (
      req.params.name.toLocaleLowerCase().replace(" ", "-") ===
      hero.name.toLocaleLowerCase().replace(" ", "-")
    );
  });

  if (!hero) {
    return res.json({
      message: "This hero does not exist",
    });
  }
  superHeroes.power.push(req.body.power);
  res.send("Power added!");
});

// ------ * ------- \\

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
