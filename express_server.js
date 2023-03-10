const express = require("express");
const app = express();
const PORT = 8080; 

app.set("view engine", "ejs");

function generateRandomString(length) {
    let randomString = "";
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++){
        randomString += characters.charAt(Math.floor(Math.random() * (characters.length)))
    }
    return randomString
}


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
    const templateVars = { id: req.params.id, longURL: req.params.longURL };
    res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
    console.log(req.body); 
    res.send(generateRandomString(5)); 
  });
  

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});