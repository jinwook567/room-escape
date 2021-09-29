const express = require("express");
const app = express();
const port = 5001;
const { google } = require("googleapis");
const path = require("path");
const keyPath = path.resolve("./superb-infusion-326605-5090ea5e4429.json");
const cors = require("cors");
const { config, msg } = require("solapi");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
// apiKey, apiSecret 설정 (설정하지 않으면 패키지 홈의 config.json 파일의 설정을 참고합니다.)
config.init({
  apiKey: process.env.MESSAGE_API_KEY,
  apiSecret: process.env.MESSAGE_API_SECRET,
});

async function send(params = {}) {
  try {
    const result = await msg.send(params);
    // console.log("RESULT:", result);
  } catch (e) {
    console.log("statusCode:", e.statusCode);
    console.log("errorCode:", e.error.errorCode);
    console.log("errorMessage:", e.error.errorMessage);
  }
}

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: SCOPES,
});

const driveService = google.drive({ version: "v3", auth });
const sheetService = google.sheets({ version: "v4", auth });

app.use(cors());
app.use(express.json());

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

const getDate = (date) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  return `${year}-${month}-${day}`;
};

app.get("/theme", async (req, res, next) => {
  const rowsData = await sheetService.spreadsheets.values.get({
    spreadsheetId: "1_IBiCNgcgMFvGA-UPjOzMuN8dq1IwKdrmn1p_1JGJNM",
    range: "Sheet1",
  });
  const rows = rowsData.data.values;
  const tableHead = rows[0];
  let objectData = rows.map((data) => {
    return tableHead.reduce((acc, cur, i) => {
      if (cur === "time") {
        acc[cur] = data[i].split(",");
        return acc;
      }
      acc[cur] = data[i];
      return acc;
    }, {});
  });

  objectData.shift();

  res.json(objectData);
});

app.get("/reservation/:date", async (req, res, next) => {
  try {
    //만약 토요일, 일요일이면 프론트에서 예약 불가능하도록함.
    //지금으로부터 30일 뒤까지만 active 하도록 함.

    //theme으로부터 가능한 시간대를 전부 불러온다.
    const rowsData = await sheetService.spreadsheets.values.get({
      spreadsheetId: "1_IBiCNgcgMFvGA-UPjOzMuN8dq1IwKdrmn1p_1JGJNM",
      range: "Sheet1",
    });
    const rows = rowsData.data.values;
    const tableHead = rows[0];
    let objectData = rows.map((data) => {
      return tableHead.reduce((acc, cur, i) => {
        if (cur === "time") {
          acc[cur] = data[i].split(",");
          return acc;
        }
        if (cur === "price") {
          acc[cur] = data[i].split(",").map((n) => n.substring(0, n.length - 1));
          return acc;
        }
        acc[cur] = data[i];
        return acc;
      }, {});
    });

    objectData.shift();

    // let themeData = objectData.find((theme) => theme.name === req.params.theme);
    let themeData = objectData;

    //time쪽 재생산
    themeData = themeData.map((data) => {
      return { ...data, time: data.time.map((time) => ({ time: time, booked: false })) };
    });

    //해당 날짜의 엑셀을 찾는다.
    const parentFolderId = "1V7huybLsVHnQAErEZbGfMXL1aCQnY41R";
    const getResponse = await driveService.files.list({
      q: `'${parentFolderId}' in parents and trashed=false`,
    });

    const existReservation = getResponse.data.files.find(
      (file) => file.name === `${getDate(req.params.date)}`
    );

    if (!existReservation) {
      return res.json(themeData);
    }

    const excelData = await sheetService.spreadsheets.values.get({
      spreadsheetId: existReservation.id,
      range: "Sheet1",
    });

    const reservation_rows = excelData.data.values;
    const reservation_tableHead = reservation_rows[0].map((data) => {
      if (data === "테마") {
        return "theme";
      }
      if (data === "시간") {
        return "time";
      }
      if (data === "이름") {
        return "name";
      }
      if (data === "연락처") {
        return "phone";
      }
      if (data === "인원") {
        return "count";
      }
    });

    //테마, 예약 시간,  이름, 연락처, 인원
    //theme, time, name. person, count

    let reservationData = reservation_rows.map((data) => {
      return reservation_tableHead.reduce((acc, cur, i) => {
        acc[cur] = data[i];
        return acc;
      }, {});
    });

    reservationData.shift();

    reservationData.forEach((data) => {
      themeData = themeData.map((theme) => {
        if (String(data.theme) === String(theme.name)) {
          theme.time = theme.time.map((time) => {
            if (time.time === data.time) {
              return { ...time, booked: true };
            }
            return time;
          });
          return theme;
        } else {
          return theme;
        }
      });
    });

    //let 배열로 만들어오고, isAvailable 항목에 넣어준다.
    return res.json(themeData);
    //엑셀 데이터에서,
  } catch (err) {
    console.error(err);
  }
});

app.post("/reservation", async (req, res, next) => {
  try {
    const sheetData = [
      req.body.date,
      req.body.theme,
      req.body.time,
      req.body.name,
      req.body.phone,
      req.body.count,
      req.body.price,
    ];

    //reservation 데이터 엑셀에 삽입.
    //예약일, 테마, 예약 시간,  이름, 연락처, 인원

    //req.body.date 이름을 가진 날짜 파일을 찾는다.

    //없으면 엑셀을 만들고, 있으면 더해라
    const parentFolderId = "1V7huybLsVHnQAErEZbGfMXL1aCQnY41R";
    const getResponse = await driveService.files.list({
      q: `'${parentFolderId}' in parents and trashed=false`,
    });

    const isExistFile = getResponse.data.files.find(
      (file) =>
        file.name === `${req.body.date}` &&
        file.mimeType === "application/vnd.google-apps.spreadsheet"
    );

    let sheetId;

    if (isExistFile) {
      sheetId = isExistFile.id;
    } else {
      const fileMetaData = {
        name: `${req.body.date}`,
        mimeType: "application/vnd.google-apps.spreadsheet",
        parents: [`${parentFolderId}`],
      };

      const fileResponse = await driveService.files.create({
        resource: fileMetaData,
        fields: "id",
      });

      sheetId = fileResponse.data.id;
      await sheetService.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A1:G1",
        valueInputOption: "RAW",
        resource: {
          values: [["예약일", "테마", "시간", "이름", "연락처", "인원", "금액"]],
        },
      });
    }

    await sheetService.spreadsheets.values.append({
      spreadsheetId: sheetId,
      // range: "Sheet1",
      range: `Sheet1!A:G`,
      valueInputOption: "RAW",
      resource: {
        values: [sheetData],
      },
    });

    // await sheetService.spreadsheets.batchUpdate({
    //   spreadsheetId: sheetId,
    // });
    let phoneData = await sheetService.spreadsheets.values.get({
      spreadsheetId: "167l2cnDvrSD2jyrrJ2v7951pR_MyVYaQX_C2xT27CfY",
      range: "Sheet1",
    });

    phoneData = phoneData.data.values.map((data) => data[0]);

    //send kakao message
    //주문자한테, 사장님한테
    const message = `예약이 완료되었습니다.

예약일:${req.body.date}
테마:${req.body.theme}
시간:${req.body.time}
예약자:${req.body.name}
연락처:${req.body.phone}
인원:${req.body.count}명
금액:${req.body.price}원`;

    send({
      messages: [
        {
          to: req.body.phone,
          from: "01084753257",
          text: message,
        },
        ...phoneData.map((data) => {
          return {
            to: data,
            from: "01084753257",
            text: message,
          };
        }),
      ],
    });

    res.send("complete");
  } catch (err) {
    console.error(err);
    res.status(400).send("error");
  }
});

app.get("/holiday", async (req, res, next) => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      Number(date.getMonth() + 1) < 10
        ? "0" + String(Number(date.getMonth() + 1))
        : date.getMonth();

    const encodeKey =
      "CWG4NwcrMvg%2F%2FAMiKmjkugF3GSCSjWAHxf4IuZ3nO8nQAPwir3uGOjCfOARA6GJTQA6A86yl8C9Gv%2FERF%2B1q5w%3D%3D";

    const response = await axios.get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&ServiceKey=${encodeKey}&_type=json&numOfRows=100`
    );

    res.json(response.data.response.body.items);
  } catch (err) {
    console.error(err);
    res.status(400).send("error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
