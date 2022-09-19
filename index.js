const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const publicVapidKey =
  "BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME";

const privateVapidKey = "4AoSsRHFaHv0Fupd2NRtrungJF2jkqgccTu-WEc781w";

webpush.setVapidDetails(
  "mailto:admin@discobots.xyz",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({
    title: "Hello World",
    body: "This is your first push notification",
  });

  webpush.sendNotification(subscription, payload).catch(console.log);
});

app.use(express.static(__dirname + "/public/")); // Public files
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
