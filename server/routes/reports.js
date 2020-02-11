const express = require("express");
const router = express.Router();
const Report = require("../models/reportDetails");
// const passport = require("passport");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const exist = await Report.find({
      title: req.body.title,
      publishedDate: req.body.publishedDate
    });
    console.log("Exist", exist);
    if (exist.length > 0) {
      res.status(409).json({ Mesaage: "Report already exists" });
    } else {
      console.log("No Reports found");
      const report_data = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        image: req.body.image,
        publishedDate: req.body.publishedDate,
        cost: req.body.cost
      };
      console.log(report_data, "Report data");
      const newReport = new Report(report_data);
      console.log("Report", newReport);
      newReport.save().then(data => {
        // console.log(data);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(409).json(data);
        }
      });
    }
    // console.log(inserted, "Inserted");
  } catch (error) {
    console.log("Error in Report insertion");
  }
});

router.post("/:title", (req, res) => {
  Report.find({ title: req.params.title }, report => {
    // console.log(report);
    res.status(200).json(report);
  });
});

module.exports = router;
