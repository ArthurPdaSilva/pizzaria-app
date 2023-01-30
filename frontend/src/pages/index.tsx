import { Input } from "@/components/ui/Input";
import Head from "next/head";
import Image from "next/image";
import logoImg from "../../public/logo.svg";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />
          </form>
        </div>
      </div>
    </>
  );
}
