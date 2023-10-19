const express = require("express");
const { header } = require("express-validator");
const {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productControllers");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyRoles = require("../middlewares/verifyRoles");
const userRoles = require("../config/userRoles");

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
router.route("/").get(listProducts);
router
  .route("/:id")
  .get(verifyRoles(userRoles.user), getProduct)
  .post(verifyRoles(userRoles.admin, userRoles.editor), addProduct)
  .put(verifyRoles(userRoles.admin, userRoles.editor), updateProduct)
  .delete(verifyRoles(userRoles.admin), deleteProduct);

module.exports = router;
