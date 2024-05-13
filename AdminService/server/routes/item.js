const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const Item = require("../models/item");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/create").post(upload.single("photo"), (req, res) => {
  const { itemId, itemName, desc, postedBy, date } = req.body;
  const price = Number(req.body.price);
  const photo = req.file.filename;

  const newItem = {
    itemId,
    itemName,
    desc,
    postedBy,
    price,
    date,
    photo,
  };

  const newItemData = new Item(newItem);

  newItemData
    .save()
    .then(() => res.json("Item Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  //route for display all

  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(upload.single("photo"), async (req, res) => {
  //update data
  let { id } = req.params;
  const { itemId, itemName, desc, postedBy } = req.body;
  const price = Number(req.body.price);
  const photo = req.file.filename;

  const updateItem = { itemId, itemName, desc, price, photo, postedBy };

  await Item.findByIdAndUpdate(id, updateItem)
    .then(() => {
      res.status(200).send({ status: "Item Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  //delete data
  const { id } = req.params;

  await Item.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "Item has successfully deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  //search data
  const { id } = req.params;

  await Item.findById(id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with fetching data", error: err.message });
    });
});

router.put("/update/order/status/:id", async (req, res) => {

  let enrollId = req.params.id;
  const { accepted } = req.body;

  const updateisAccepted = {

    accepted,

  }

  if (accepted) {
    const item = await Item.findById(enrollId);
    const { postedBy } = item;

    // Find the user by username and retrieve their email
    const user = await User.findOne({ username: postedBy });
    const userEmail = user ? user.email : null;
    console.log("email:",userEmail)
    if (userEmail) {
      // Send email to the user's email address
      sendEmail({
        to: userEmail,
        subject: "Course Accepted",
        text: `Your course has"${item.itemName}" been accepted.`,
      });
    } else {
      console.log(`User with username '${postedBy}' not found.`);
    }
  }


  try {

      await Item.findByIdAndUpdate(enrollId, updateisAccepted)
      res.send('request accepted Successfully')

  } catch (error) {
      return res.status(400).json({ message: error });
  }
});

module.exports = router;
