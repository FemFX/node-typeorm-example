import { Request, Response, Router } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ relations: ["user"] });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, text, userId } = req.body;
    const user = await User.findOneOrFail(userId);
    const post = Post.create({ title, text, user });
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export default router;
