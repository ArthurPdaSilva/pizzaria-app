import { Request, Response } from "express";
import { AddItensService } from "../../services/order/AddItensService";


class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body;

        const addItem = new AddItensService();
        const order = await addItem.execute({
            order_id,
            product_id,
            amount
        })

        res.json(order)
    }
}

export { AddItemController }