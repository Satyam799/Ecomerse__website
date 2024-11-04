const express = require("express");
const {
  authuser,
  registeruser,
  loginguserout,
  getuserprofile,
  updateuserprofile,
  getallusers,
  deleteallusers,
  Updateuser,
  Getuser,
  Getusersbyid,
  Deletnormaluser,
} = require("../Controller/Usercontroller");

const { protect, Adminaccess } = require("../middleware/authmiddleware");

const router = express.Router();

router.route("/").post(registeruser).get(protect, Adminaccess,getallusers);
router.route("/logout").post(loginguserout);
router.route("/login").post(authuser);
router
  .route("/profile")
  .get(protect, getuserprofile)
  .put(protect, updateuserprofile);
router
  .route("/:id")
  .delete(protect, Adminaccess, Deletnormaluser)
  .put(protect, Adminaccess, Updateuser)
  .get(protect, Adminaccess, Getusersbyid);

module.exports = router;
