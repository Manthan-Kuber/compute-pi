const fs = require("fs"),
  express = require("express"),
  es = require("event-stream"),
  app = express(),
  PORT = 4000;
cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Url was hit");
});

app.get("/get-random-numbers", (req, res) => {
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.json({
        numbers: null,
        error: true,
      });
    }

    const lines = data.trim().split("\n");

    const numbers = lines.map((line) => parseInt(line, 10));

    return res.json({
      numbers,
      error: false,
    });

  });
});

app.get("/compute-pi/:num/:path", (req, res) => {
  const num = req.params.num;
  const path = req.params.path;
  if (!num || !path) {
    res.send("Missing arguments");
    return;
  }
  const lines = [""];
  const s = fs
    .createReadStream(path)
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
