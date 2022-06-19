const exp = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
var cors = require('cors')
const app = exp();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch')
const path = require('path');

const PRIVATE_KEY = fs.readFileSync('private-key.txt');
app.use(bodyParser.json());
app.use(cors());

app.use(exp.static(path.join(__dirname, 'dist/angular')));

// app.get("/", (req, res) => { res.send("<h1>Hello World</h1>"); });
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/angular', 'index.html'));
});
// console.log('dirname là:', path.join(__dirname, 'dist/angular'));

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (await checkUser(username, password) == true) {
    const userInfo = getUserInfo(username, password);
    const jwtToken = jwt.sign({}, PRIVATE_KEY, {
      algorithm: 'HS256',
      expiresIn: 120
    })
    userInfo.then((userInfo) => {
      res.status(200).json({ jwtToken, expiresIn: 120, userInfo });
    })
  }
  else res.sendStatus(401)
})
checkUser = async (username, password) => {
  const response = await fetch(`https://json-api-public.herokuapp.com/api/account?username=${username}&password=${password}`)
  const data = await response.json()
  if (data[0]?.username === username && data[0]?.password === password) { return true }
  return false;
}
getUserInfo = async (username, password) => {
  const response = await fetch(`https://json-api-public.herokuapp.com/api/account?username=${username}&password=${password}`)
  const data = await response.json();
  if (data) return data[0];
  return {}
}

app.listen(port, () => {
  console.log(`Ung dung dang chay voi port ${port}`);
});