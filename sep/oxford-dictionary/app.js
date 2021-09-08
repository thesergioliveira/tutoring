#!/usr/bin/env node
const { API_KEY, API_ID } = require("./config");
const axios = require("axios");

const word = process.argv.slice(2).join("").toLowerCase();

// language = "en-gb"
// word_id = "example"
// url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/" + language + "/" + word_id.lower()
// r = requests.get(url, headers={"app_id": <your_app_id>, "app_key": <your_app_key>})

const apiFetch = () => {
  const url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/";
  axios(url + "en-gb/" + word, {
    headers: {
      "Accept": "application/json",
      "app_id": API_ID,
      "app_key": API_KEY,
    },
  })
    .then((data) => {
        let definitions = data.data.results[0].lexicalEntries[0].entries[0].senses.map((definition)=> {
          return definition.definitions;
        });
        console.log(`${definitions.join(",")}`);


    })
    .catch((err) => console.log(err));
};
apiFetch();
// app.use(express.json());