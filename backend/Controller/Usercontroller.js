const { asynchandler } = require("../middleware/asyncmiddleware");
const User = require("../Modal/usermodal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

require("dotenv/config");

//@desc Auth user & get login
//@route POST /api/user/login
//@access public

const authuser = asynchandler(async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  if (data && bcrypt.compareSync(req.body.password, data.password)) {
    const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRATE, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    });

    res.status(200).send(data);
  } else {
    res.status(401);
    throw Error("User not found");
  }
});

//@desc Register user
//@route POST /api/user
//@access public

const registeruser = asynchandler(async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name)
    throw Error("Please fill all required details to crerate an user");

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(401).send({ message: "User is already registered" });
  }
  const data = await User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
  });
  if (data) {
    const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRATE, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 100,
      secure: false,
    });

    return res.status(200).send(data);
  } else {
    res
      .status(401)
      .send({ message: "Unable to create the user invalid details" });
  }
});

//@desc get user
//@route GET /api/user
//@access PRIVATE

const Getuser = asynchandler(async (req, res) => {
  return res.send("auth user");
});

//@desc logout user
//@route POST /api/user/logout
//@access Private

const loginguserout = asynchandler(async (req, res) => {
  res.clearCookie();
  res.status(200).send({ message: "User is loged out successfully " });
});

//@desc get user profile
//@route GET /api/user/profile
//@access Private

const getuserprofile = asynchandler(async (req, res) => {
  console.log("hi");
  const data = await User.findById(req.user._id);

  if (data) {
    return res.status(200).send(data);
  }
  res.status(401).send("no user found by this id");
});

//@desc updateuserprofile
//@route PUT /api/user/profile
//@access Private

const updateuserprofile = asynchandler(async (req, res) => {
  console.log(req.body);
  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    },
    {
      new: true,
    }
  );
  if (user) {
    return res.status(200).send(user);
  }

  res.status(401).send("no user found ");
});

//@desc getuser
//@route Get /api/user/profile
//@access Private/Admin

const getallusers = asynchandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).json({message:"Unabel to get the users"});
  }
});

//@desc deleteuser
//@route delete  /api/user/profile/:id
//@access Private/Admin

const Deletnormaluser = async (req, res) => {
  try {
    const user=await User.findById(req.params.id)
    if(user?.isAdmin===false){
    await User.findByIdAndDelete(req.params.id);

    return  res.status(200).json({message:"Deleted successfully"});
    }else{throw new Error('Could not delet Adminss')}
  } catch (err) {

   return res.status(400).json({message:err.message || "Unabel to update the user"});
  }
};

//@desc updateuser
//@route PUT  /api/user/profile/:id
//@access Private/Admin

const Updateuser = asynchandler(async (req, res) => {
  try {
    if(req.params.id==req.user._id)throw new Error('')
     
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin:req.body.admin
      },
      { new: true }
    );
    res.status(200).send(updateduser);
  } catch (err) {
    console.log(err)
    res.status(400).send("Unabel to update the user");
  }});


const Getusersbyid = asynchandler(async (req, res) => {
  try {
    const userid = await User.findById(req.params.id);
    res.status(200).send(userid);
  } catch (err) {
    res.status(400).send("Unabel to get the users by this id");
  }
});


module.exports = {
  authuser,
  registeruser,
  loginguserout,
  getuserprofile,
  updateuserprofile,
  getallusers,
  Deletnormaluser,
  Updateuser,
  Getuser,
  Getusersbyid
};
