import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import React from "react";
import Header from "../../components/Header";

export default function Dashboard() {
  return (
    <>
      <Head>Painel - Sujeito Pizzaria</Head>
      <div>
        <Header />
        <h1>Painel</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
