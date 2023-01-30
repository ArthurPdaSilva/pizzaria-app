import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../public/logo.svg";
import styles from "../../styles/home.module.scss";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form className={styles.form}>
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={true}>
              Cadastrar
            </Button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login!
          </Link>
        </div>
      </div>
    </>
  );
}
