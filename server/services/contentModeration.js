const axios = require("axios");
const text =
  "Most of the time, operators and functions automatically convert the values given to them to the right type.For example, alert automatically converts any value to a string to show it. Mathematical operations convert values to numbers.There are also cases when we need to explicitly convert a value to the expected type.";

axios
  .post(
    "https://api.textrazor.com",
    {
      text: text,
      classifiers: "community",
      cleanup: {
        mode: "stripTags",
      },
    },
    {
      headers: {
        "X-TextRazor-Key":
          "78b16a16757b287451b7a7697cb3ca687aba0da1a4bdda51c1043b47",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip",
      },
    }
  )
  .then((response) => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });
