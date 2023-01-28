import { compare } from "bcryptjs";
import prismaClient from "../../prisma";

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {
    async execute({ email, password}: AuthRequest) {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
              email: email
            }
          })
      
        if(!userAlreadyExists){
            throw new Error("User/password incorrect")
        }

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if(!passwordMatch) {
            throw new Error("User/password incorrect")
        }

        // Gerar token

        return {ok: true}
    }
}

export { AuthUserService };