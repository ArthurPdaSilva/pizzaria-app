import { OrderTypeProps } from "@/pages/dashboard";
import React from "react";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import styles from "./styles.module.scss";

interface ModalOrderProps {
  isOpen: boolean;
  order: OrderTypeProps[];
  handleFinishModal: (id: string) => void;
  onRequestClose: () => void;
}

export default function ModalOrder({
  isOpen,
  order,
  onRequestClose,
  handleFinishModal,
}: ModalOrderProps) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "30px",
      backgroundColor: "#1d1d2e",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#f34748" />
      </button>
      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>
        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {item.amount} - <strong>{item.product.name}</strong>
            </span>
            <span className={styles.description}>
              {item.product.description}
            </span>
          </section>
        ))}

        <button onClick={() => handleFinishModal(order[0].order_id)}>
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
}
