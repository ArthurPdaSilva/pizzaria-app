import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import logoImg from "../../../public/logo.svg";
import styles from "../../styles/home.module.scss";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useContext(AuthContext);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.warn("Preencha todos os campos");
      return;
    }
    setLoading(true);
    const data = {
      name,
      email,
      password,
    };

    await signUp(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form className={styles.form} onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
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
