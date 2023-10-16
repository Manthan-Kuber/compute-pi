const fs = require("fs"),
  express = require("express"),
  es = require("event-stream"),
  app = express(),
  PORT = 3000,
  masterFilePath = "../master_file.txt";

app.get("/", (req, res) => {
  res.send("Url was hit");
});

app.get("/compute-pi/:num", (req, res) => {
  const num = req.params.num;
  if (!num) {
    res.send("Please send a query parameter");
    return;
  }
  const lines = [""];
  const s = fs
    .createReadStream(masterFilePath)
    .pipe(es.split())
    .pipe(
      es
        .mapSync((line) => {
          s.pause();
          lines.push(line);
          s.resume();
        })
        .on("error", (err) => {
          console.log("Error:", err);
        })
        .on("end", () => {
          lines.splice(0, 3);
          let result,
            doesPiExist = false;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(num)) {
              let temp = lines[i].split(" ");
              temp = temp.filter((e) => e !== "");
              result = temp[1];
              doesPiExist = true;
              break;
            }
          }
          if (!doesPiExist)
            return res.json({
              x: null,
              pi_x: null,
              error: true,
            });
          res.send({
            x: num,
            pi_x: result,
            error: false,
          });
        })
    );
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
