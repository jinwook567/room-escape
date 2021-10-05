const express = require("express");
const app = express();
const port = 80;
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRouter = require("./router");

dotenv.config();
// apiKey, apiSecret 설정 (설정하지 않으면 패키지 홈의 config.json 파일의 설정을 참고합니다.)

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "../front/build")));
app.get("*", (req, res) => {
  // index.html 파일 응답
  res.sendFile(path.join(__dirname, "../front/build", "index.html"));
});

// app.use("*", express.static(__dirname + "front/index.html"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
