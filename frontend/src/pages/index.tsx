import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useContext } from "react";
import logoImg from "../../public/logo.svg";
import styles from "../styles/home.module.scss";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      email: "algum@gmail.com",
      password: "21321312",
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <form className={styles.form} onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}
