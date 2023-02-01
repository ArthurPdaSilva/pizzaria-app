import Header from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { useState, FormEvent, ChangeEvent } from "react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { setupApiClient } from "../services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);
  const [categories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const data = new FormData();
      if (
        name.length <= 0 ||
        price.length <= 0 ||
        description.length <= 0 ||
        imageAvatar === null
      ) {
        toast.error("Preencha corretamente os campos");
        return;
      }

      data.append("name", name);
      data.append("description", description);
      data.append("price", price);
      data.append("file", imageAvatar);
      data.append("categoryId", categories[categorySelected].id);

      const apiClient = setupApiClient();
      await apiClient.post("/product", data);
      toast.success("Produco cadastrado com sucesso");
    } catch (error) {
      toast.error("Erro ao cadastrar");
      console.log(error);
    }

    setName("");
    setPrice("");
    setDescription("");
    setAvatarUrl("");
    setImageAvatar(null);
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

            <select
              value={categorySelected}
              onChange={(e) =>
                setCategorySelected(e.target.value as unknown as number)
              }
            >
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Descreva seu produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

// Inicia antes do componente ser montado
export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);
  const response = await api.get("/categories");
  return {
    props: { categoryList: response.data },
  };
});
