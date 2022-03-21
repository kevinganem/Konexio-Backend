const express = require("express");
const app = express();
const responseAPIPokemon = {
  count: 1126,
  next: "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    },
    {
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/",
    },
    {
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/",
    },
    {
      name: "blastoise",
      url: "https://pokeapi.co/api/v2/pokemon/9/",
    },
    {
      name: "caterpie",
      url: "https://pokeapi.co/api/v2/pokemon/10/",
    },
  ],
};

app.get("/", (req, res) => {
  res.json(responseAPIPokemon.results);
});

app.get("/:id", (req, res) => {
  const id = responseAPIPokemon.results[req.params.id - 1];
  const namePokemon = `Pokemon: ${id.name}`;

  if (!id) {
    return res.json({
      message: "This Pokemon does not exist",
    });
  } else if (!namePokemon) {
    return res.json({
      message: "This Pokemon does not exist",
    });
  }

  res.send(namePokemon);
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
