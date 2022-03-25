const router = require("express").Router();
const { requireLogin } = require("../middlewares/route-guard");

router.use(requireLogin);
const renderProfilePage = (req, res) => {
  res.render("profile", { user: req.session.user });
};
// router.get("/profile", renderProfilePage);

const renderDetailsPage = (req, res) => {
  console.log(req.myOwnCustomKey);
  res.send("This is the Details Page");
};
router.get("/details", renderDetailsPage);

module.exports = router;
