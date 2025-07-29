const {
  addFood,
  listFood,
  removeFood,
} = require("../Controllers/foodController.js");
const multer = require("multer"); //For image uploading

const router = require("express").Router();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    // Remove spaces from the original filename and use it directly
    const cleanFilename = file.originalname.replace(/\s+/g, '');
    return cb(null, cleanFilename); // Use clean filename without timestamp
  },
});

const upload = multer({ storage: storage }); //This one is act like a middle ware to store uploaded image in the desired folder/Location

router.post("/add-food", upload.single("image"), addFood);
router.get("/food-list", listFood);
router.post("/remove-food", removeFood);

module.exports = router;
