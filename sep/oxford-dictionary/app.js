#!/usr/bin/env node
const apiFetch = require("./dictionary");
const word = process.argv.slice(2).join("").toLowerCase();
apiFetch(word);
// apiFetch(word).then(console.log).catch(console.error)





