import Header from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { useState, FormEvent } from "react";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (name === "") return;
    await api.post("/category", { name });

    toast.success("Categoria cadastrada com sucesso!");
    setName("");
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizzar</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>
          <form className={styles.forms} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
