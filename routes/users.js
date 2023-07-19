const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userGetMany,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/users");
const { fieldValidation } = require("../middlewares/validate-fileds");

const {
  isRoleValid,
  emailExist,
  userExistById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", userGetMany);

router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("email").custom(emailExist),
    check("firstName", "The name is required").not().isEmpty(),
    check("lastName", "The name is required").not().isEmpty(),
    check("password", "Password must be at least 8 characters long ").isLength({
      min: 8,
    }),
    check("role").custom(isRoleValid),
    fieldValidation,
  ],
  userPost
);
router.put(
  "/:id",
  [
    check("id", "Invalid id").isMongoId().custom(userExistById),
    fieldValidation,
  ],
  userPut
);
router.patch("/", userPatch);
router.delete(
  "/:id",
  [
    check("id", "Invalid id").isMongoId().custom(userExistById),
    fieldValidation,
  ],
  userDelete
);

module.exports = router;
