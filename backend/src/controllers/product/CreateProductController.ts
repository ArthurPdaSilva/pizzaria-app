import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService"

class CreateProductController {
    async handle(req: Request, res: Response) { 
        const {name, price, description, categoryId} = req.body

        if(!req.file) throw new Error("Error Upload File")

        const { originalname, filename: banner } = req.file

        const createProductService = new CreateProductService();
        const product = await createProductService.execute({name, price, description, banner, categoryId});

        return res.json(product)
    }
}

export { CreateProductController }