import Header from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { useState, FormEvent, ChangeEvent } from "react";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const img = e.target.files;
    if (!img) return;
    const image = img[0];
    if (!image) return;
    const types = ["image/png", "image/jpeg"];
    if (types.includes(image.type)) {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzar</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="white" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Logo Sujeito Pizzaria"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select name="" id="">
              <option value="">Bebida</option>
              <option value="">Bebida</option>
            </select>

            <input type="text" placeholder="Digite o nome do produto" />

            <input type="text" placeholder="Preço do produto" />

            <textarea placeholder="Descreva seu produto" />
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
