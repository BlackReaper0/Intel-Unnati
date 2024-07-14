var con = require("./connection");
var express = require("express");

var app = express();

var bodyParser = require("body-parser");
const e = require("express");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/ANPR/index.html");
});
app.get("/help.html", function (req, res) {
  res.sendFile(__dirname + "/public/ANPR/help.html");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/ANPR/finalmain.html");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/ANPR/finalmain.html");
});

app.post("/students", function (req, res) {
  var Licence = req.body.Licence;
  var StateCode = req.body.StateCode;
  var State = req.body.State;
  var Date = req.body.Date;
  var Day = req.body.Day;
  var Month = req.body.Month;
  var Time = req.body.Time;
  var Tag = req.body.Tag;

  var sql =
    "INSERT INTO anpr(Licence,StateCode,State,Date,Day,Month,Time,Tag ) VALUES?";

  var values = [[Licence, StateCode, State, Date, Day, Month, Time, Tag]];
  con.query(sql, [values], function (error, result) {
    if (error) throw error;

    res.redirect("/students");
  });
});

app.get("/students", function (req, res) {
  con.connect(function (error) {
    var sql = "select * from anpr";

    con.query(sql, function (error, result) {
      if (error) console.log(error);

      res.render(__dirname + "/students", { anpr: result });
    });
  });
});

app.get("/delete-student", function (req, res) {
  con.connect(function (error) {
    const Licence = req.query.Licence;
    // var StateCode = req.body.StateCode;

    const sql = "delete from anpr where Licence=?";

    con.query(sql, [Licence], function (error, result) {
      if (error) console.log(error);
      res.redirect("/SearchLicence");
    });
  });
});
app.get("/update-student", function (req, res) {
  con.connect(function (error) {
    var sql = "select * from anpr WHERE Licence=?";

    const Licence = req.query.Licence;

    con.query(sql, [Licence], function (error, result) {
      if (error) console.log(error);
      res.render(__dirname + "/update-student", { anpr: result });
    });
  });
});

app.post("/update-student", function (req, res) {
  const Licence = req.body.Licence;
  const StateCode = req.body.StateCode;
  const State = req.body.State;
  const Date = req.body.Date;
  const Day = req.body.Day;
  const Month = req.body.Month;
  const Time = req.body.Time;
  const Tag = req.body.Tag;

  con.connect(function () {
    var sql =
      "UPDATE anpr set StateCode=?,State=?,Date=?, Day=?, Month=?,Time=?, Tag=? where Licence=?";

    con.query(
      sql,
      [StateCode, State, Date, Day, Month, Time, Tag, Licence],
      function (error, result) {
        if (error) console.log(error);
        res.redirect("/searchLicence");
      }
    );
  });
});

app.get("/searchLicence", function (req, res) {
  con.connect(function () {
    var sql = "select * from anpr";

    con.query(sql, function (error, result) {
      if (error) console.log(error);

      res.render(__dirname + "/searchLicence", { anpr: result });
    });
  });
});

app.get("/search", function (req, res) {
  const Licence = req.query.Licence;
  const StateCode = req.query.StateCode;
  const Tag = req.query.Tag;
  // console.log(req);
  con.connect(function () {
    const sql =
      "SELECT * FROM anpr where Licence LIKE '%" +
      Licence +
      "%' AND StateCode LIKE '%" +
      StateCode +
      "%' AND Tag LIKE '%" +
      Tag +
      "%'";

    con.query(sql, function (error, result) {
      if (error) throw error;
      // console.log(result);
      res.render(__dirname + "/search-students", { anpr: result });
    });
  });
});

app.listen(5500, () => {
  console.error(`Welcome to Port ${5500}`);
});
