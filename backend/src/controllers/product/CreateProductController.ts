import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService"

class CreateProductController {
    async handle(req: Request, res: Response) { 
        const {name, price, description, categoryId} = req.body
        let banner = ''

        if(!req.file) throw new Error("Error Upload File")

        const { originalname, filename } = req.file
        console.log(filename)

        const createProductService = new CreateProductService();
        const product = await createProductService.execute({name, price, description, banner, categoryId});

        return res.json(product)
    }
}

export { CreateProductController }