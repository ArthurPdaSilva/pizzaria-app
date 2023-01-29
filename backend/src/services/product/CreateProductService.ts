import prismaClient from "../../prisma"

interface ProductRequest {
    name: string,
    price: string,
    description: string,
    banner: string,
    categoryId: string
}

class CreateProductService {
    async execute({name, price, description, banner, categoryId}: ProductRequest) {
        const product = await prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id: categoryId
            }
        })

        return product
    }
}

export { CreateProductService }