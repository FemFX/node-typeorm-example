import { Request, Response, Router } from "express";
import { User } from "../entity/User";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({ relations: ["posts"] });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOneOrFail(id, { relations: ["posts"] });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const user = User.create({
      name,
      email,
      role,
    });
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const user = await User.findOneOrFail(id);
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOneOrFail(id);
    await user.remove();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export default router;
