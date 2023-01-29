import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
    async handle(req: Request, res: Response) {
        const { order_id  } = req.body;
0
        const sendOrder = new SendOrderService();
        const order = await sendOrder.execute({
            order_id,
        })

        res.json(order)
    }
}

export { SendOrderController }