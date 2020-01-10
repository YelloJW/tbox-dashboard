// Dependencies
const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require('fs');
const csvParser = require('csv-parser');
const file = './sport_data.csv'

// get latest results
router.get("/results", async (req, res) => {
    const results = []

    const send = () => {
        // return last 5 results
        return res.send({results:results.slice(-5)})
      }

    fs.createReadStream(file).pipe(csvParser())
   .on('data', (row) =>  {
    // for each row of CSV push result to results array
    const result = `${row.HomeTeam} (${row.FTHG}) vs ${row.AwayTeam} (${row.FTAG})`
    results.push([result]);
   })
   .on('end', () => {
    send()
   })
});


router.post("/results", async (req, res) => {
  // save team
  const team = req.body.team[0].toUpperCase() + req.body.team.substring(1)
  const wins = []
  const resultsSummary = {}

  const send = () => {
    return res.send({wins: wins.reverse(), summary: resultsSummary})
  }

  fs.createReadStream(file).pipe(csvParser())
  .on('data', (row) =>  {
    // if team won save fixture to wins array, else count if result was a win, loss or draw
    if ((team == row.HomeTeam && row.FTR == "H") || (team == row.AwayTeam && row.FTR == "A")) {
      wins.push({home: row.HomeTeam, away: row.AwayTeam, result: row.FTR});
      resultsSummary['W'] = (resultsSummary['W'] || 0) + 1;
    } else if ((team == row.HomeTeam && row.FTR == "A") || (team == row.AwayTeam && row.FTR == "H")) {
      resultsSummary['L'] = (resultsSummary['L'] || 0) + 1;
    } else if ((team == row.HomeTeam || team == row.AwayTeam) && row.FTR == "D") {
      resultsSummary['D'] = (resultsSummary['D'] || 0) + 1;
    }
   })
   .on('end', () => {
    send()
   })
});

module.exports = router;
