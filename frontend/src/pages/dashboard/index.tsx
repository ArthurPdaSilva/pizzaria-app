import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Header from "../../components/Header";
import { setupApiClient } from "../services/api";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import ModalOrder from "@/components/ModalOrderProduct";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

export type OrderTypeProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: OrderProps;
};

interface HomeProps {
  orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || null);
  const [modalItem, setModalItem] = useState<OrderTypeProps[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function handleOpenModal(id: string) {
    const apiClient = setupApiClient();
    const response = await apiClient.get("/order/detail", {
      params: {
        order_id: id,
      },
    });
    setModalItem(response.data);
    setModalVisible(true);
  }

  async function handleFinishModal(id: string) {
    const apiClient = setupApiClient();
    await apiClient.put("/order/finish", { order_id: id });
    const response = await apiClient.get("orders");
    setOrderList(response.data);
    setModalVisible(false);
  }

  async function handleRefresh() {
    const apiClient = setupApiClient();
    const response = await apiClient.get("orders");
    setOrderList(response.data);
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>Painel - Sujeito Pizzaria</Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button className={styles.anima} onClick={handleRefresh}>
              <FiRefreshCcw color="#3fffa3" size={25} />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.length === 0 && (
              <span className={styles.empty}>
                Nenhum pedido foi encontrado...
              </span>
            )}

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

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            order={modalItem}
            handleFinishModal={handleFinishModal}
          />
        )}
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
