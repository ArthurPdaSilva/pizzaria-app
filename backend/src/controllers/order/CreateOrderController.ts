import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response) { 
        const { table, name } = req.body

        const createOrderService = new CreateOrderService();
        const product = await createOrderService.execute({name, table});

        return res.json(product)
    }
}

export { CreateOrderController }