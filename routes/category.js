const router = require("./listing");
const categoryController = require("../controllers/category.js");
const wrapAsync = require("../utils/wrapAsync.js");


router
.route("/")
.get(wrapAsync (categoryController.categories));

module.exports = router;