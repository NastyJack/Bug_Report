const router = require("express").Router();
const Report = require("../models/reportDetails");

router.route("/").post(async (req, res) => {
  console.log("FIler api", req.body);
  try {
    Report.find({
      title: { $regex: ".*" + req.body.title + ".*" },
      publishedDate: { $gte: req.body.start, $lte: req.body.end },
      cost: { $gte: req.body.costgt, $lte: req.body.costlt }
    }).then(data => {
      console.log("DATA FILTER", data);
      res.status(200).json({ message: data });
      // if (data.length > 0) {
      //   console.log("INDSIDE DATAT", data);
      //   res.send(200).json(data);
      // } else {
      //   res.send(400).json(data);
      // }
    });
  } catch (error) {
    res.status(404).json({ message: "Error while filtering" });
  }
});

module.exports = router;
