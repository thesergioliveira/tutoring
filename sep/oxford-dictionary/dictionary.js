// Information about the url for the get request
// let language = "en-gb"
// let word = "example"
// url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/" + language + "/" + word

const axios = require("axios");
const { API_KEY, API_ID } = require("./config");
const apiFetch = (str) => {
  const url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/";
  axios(url + "en-gb/" + str, {
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
      return (
        console.log(definitions.reduce((acc, def, i)=> {
            acc += `${i}-` + def + "\n";
            return acc;
        },`Definitions:` + "\n"))
      )
        
    })
    .catch((err) => console.log(err));
};
module.exports = apiFetch;