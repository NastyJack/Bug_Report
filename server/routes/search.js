const router = require("express").Router();
const Report = require("../models/reportDetails");

router.route("/").post((req, res) => {
  // console.log(req.body.title, "BACKEND");
  if (req.body.title) {
    Report.find({
      title: { $regex: ".*" + req.body.title + ".*", $options: "i" }
      // $orderby: { publishedDate: -1 }
    })
      .sort({ savedOn: -1 })
      .then(data => {
        // console.log("DATA IN BACKEND", data);
        if (!data || Object.keys(data).length <= 0) {
          res.status(404).json({ message: "Title not found" });
        }
        // console.log("Data found:", data[0]);
        res.status(200).json(data);
      })
      .catch(error => console.log("Error while finding"));
  } else {
    res.status(500).json({ message: "no body data passes" });
  }
});

module.exports = router;
