const Post = require('../models/postModel');

const createpost = async (req, res) => {
    const { title, date } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const post = new Post({ title, date, image });
        const postData = await post.save();
        res.status(200).send({ success: true, msg: "Post data", data: postData });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const getpost = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).send({ success: true, msg: "Post Get", data: posts });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const deletepost = async (req, res) => {
    try {
        const id = req.params.id;
        await Post.deleteOne({ _id: id });
        res.status(200).send({ success: true, msg: "Post Deleted Succefully!" });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const updatepost = async (req, res) => {

    try {
        if (req.file != undefined) {
            const { id, title, date } = req.body;
            const image = req.file.filename;
            await Post.findByIdAndUpdate({ _id: id }, { $set: { title, date, image } })

            res.status(200).send({ success: true, msg: "Post Updated Succefully!" });
        } else {
            const { id, title, date } = req.body;
            await Post.findByIdAndUpdate({ _id: id }, { $set: { title, date } })

            res.status(200).send({ success: true, msg: "Post Updated Succefully!" });
        }

    } catch (error) {

    }
}

module.exports = {
    createpost,
    getpost,
    deletepost,
    updatepost
}