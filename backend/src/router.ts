import { Request, Response, Router } from "express";

export const router = Router();
router.get("/teste", (req: Request, res: Response) => {
    return res.json({ok: true})
})
