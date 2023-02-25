import { user } from "../models/user";
import { post } from "../models/posts";

module.exports = {
  getAllPosts: async (req, res) => {
        try {
            const posts = await post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: user,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
  },
  getCurrentUserPosts:  async (req, res) => {
    try {
        const {userId} = req.params
        const posts = await post.findAll({
            where: {userId: userId},
            include: [{
                model: user,
                required: true,
                attributes: [`username`]
            }]})
        res.status(200).send(posts)
    } catch (error) {
        console.log('ERROR IN getCurrentUserPosts')
        console.log(error)
        res.sendStatus(400)
    }
  },
  addPost: async () => {
    try {
      const { title, content, status, userId } = req.body;
      await post.create({
        title: title,
        content: content,
        privateStatus: status,
        userId: userId,
      });
      req.sendStatus(200);
    } catch (error) {
      console.log(error);
      req.sendStatus(400);
    }
  },
  editPost: async(req, res) => {
    try {
        const {id}  = req.params;
        const {status} = req.body;
        await post.update({PrivateStatus: status}, {where: {id: +id} })
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }
  },
  deletePost: async (req, res) => {
    try {
        const {id} = req.params;
        await post.destroy({where: {id: +id}})
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }
  },
};
