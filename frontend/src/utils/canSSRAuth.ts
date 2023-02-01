import { AuthTokenError } from '@/pages/services/errors/AuthTokenError';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { destroyCookie, parseCookies } from 'nookies'

//funcao para paginas que só pode ser acessadas por pessoas logadas
export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);
    const token = cookies['@nextauth.token']

    if(!token){
      return {
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }

    try { 
        return await fn(ctx);
    } catch(err) {
        if(err instanceof AuthTokenError) {
            destroyCookie(ctx, '@nextauth.token')
        }

        return {
            redirect:{
              destination: '/',
              permanent: false,
            }
          }

    }
  }

}