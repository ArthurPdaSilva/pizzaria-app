import { canSSRAuth } from "@/utils/canSSRAuth";
import React from "react";

export default function Dashboard() {
  return <div>Dashboard</div>;
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
