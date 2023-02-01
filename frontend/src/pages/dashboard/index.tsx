import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Header from "../../components/Header";
import { setupApiClient } from "../services/api";
import styles from "./styles.module.scss";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || null);

  function handleOpenModal(id: string) {
    alert("Penis is equal: " + id);
  }

  return (
    <>
      <Head>Painel - Sujeito Pizzaria</Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw color="#3fffa3" size={25} />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.map((item) => (
              <section key={item.id}>
                <button onClick={() => handleOpenModal(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa: {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);
  const response = await api.get("/orders");
  return {
    props: {
      orders: response.data,
    },
  };
});
