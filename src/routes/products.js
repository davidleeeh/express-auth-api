const express = require("express");
const {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productControllers");
const verifyJWT = require("../middlewares/verifyJWT");
const { header } = require("express-validator");

const router = express.Router();

router.use(
  header("authorization")
    .notEmpty()
    .withMessage("Missing authorization header")
    .custom((value) => {
      const fragments = value.split(" ");
      return fragments.length == 2 && fragments[0] === "Bearer";
    })
    .withMessage("Invalid authorization header"),
  verifyJWT
);
router.route("/").get(listProducts).post(addProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
