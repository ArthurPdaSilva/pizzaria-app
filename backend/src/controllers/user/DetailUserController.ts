import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const detailUserService = new DetailUserService();
        const userId = req.userId;
        const user = await detailUserService.execute(userId);
        return res.json(user);
    }
}

export { DetailUserController }