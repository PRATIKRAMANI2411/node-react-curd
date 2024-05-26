const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const postController = require("../controller/postController")

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));
route.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/postImages'), (error, success) => {
            if (error) {
                console.log(error);
            }
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, (error, success) => {
            if (error) {
                console.log(error);
            }
        })
    }
})

const upload = multer({ storage: storage });

route.post("/create-post", upload.single('image'), postController.createpost);
route.get("/get-posts", postController.getpost);
route.get("/delete-posts/:id", postController.deletepost);
route.post("/update-posts", upload.single('image'), postController.updatepost);


module.exports = route;