const express = require("express");
const app = express();

// ❌ Vulnerable route (Command Injection)
app.get("/run", (req, res) => {
  const { exec } = require("child_process");

  let userInput = req.query.cmd;

  exec("ls " + userInput, (err, stdout, stderr) => {
    if (err) {
      return res.send(err.message);
    }
    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
