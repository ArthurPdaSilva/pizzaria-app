import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const detailUserService = new DetailUserService();
        const userId = req.userId;
        const user = await detailUserService.execute(userId);
        console.log("Penisss: ", user)
        return res.json(user);
    }
}

export { DetailUserController }