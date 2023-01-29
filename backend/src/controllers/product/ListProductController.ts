import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListCategoryService";

class ListProductController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        const listProductService = new ListProductService();
        const products = await listProductService.execute({category_id});
        return res.json(products)
    }
}

export { ListProductController }