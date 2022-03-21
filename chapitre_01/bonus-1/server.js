const axios = require("axios");

axios
  .get("http://localhost:8000/")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
