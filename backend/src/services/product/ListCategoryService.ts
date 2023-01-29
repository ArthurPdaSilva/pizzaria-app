import prismaClient from "../../prisma"

interface ProductRequest {
    category_id: string
}

class ListProductService {
    async execute({ category_id }: ProductRequest) {
        const product = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            } 
        })

        return product;
    }
}

export { ListProductService }