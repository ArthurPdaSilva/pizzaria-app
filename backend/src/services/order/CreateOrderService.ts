import { prisma } from "@prisma/client"
import prismaClient from "../../prisma"

interface OrderRequest {
    table: number,
    name: string
}

class CreateOrderService {
    async execute({ name, table }: OrderRequest) {
        const order = await prismaClient.order.create({
            data: {
                table,
                name
            }
        })

        return order
    }
}

export { CreateOrderService }