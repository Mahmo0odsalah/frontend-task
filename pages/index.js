import React from "react";
import Login from "../components/login";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
const Home = () => (
  <div style={{ fontFamily: "Roboto" }}>
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <style global jsx>{`
        overflow-x: hidden;
      `}</style>
    </Head>
    <div
      style={{
        position: "absolute",
        top: "0%",
        left: "0%",
        width: "50%",
        height: "100%",
        backgroundColor: "#009688"
      }}
    >
      <Typography
        style={{
          margin: "2px 2px 2px 8px",
          color: "white"
        }}
        variant="h5"
        noWrap
      >
        Valoro
      </Typography>
    </div>
    <div
      style={{
        position: "absolute",
        right: "0%",
        top: "0%",
        float: "right",
        width: "50%",
        height: "100%"
      }}
    >
      <div
        style={{ position: "relative", left: "25%", top: "30%", width: "50%" }}
      >
        <Login />
      </div>
    </div>
  </div>
);

export default Home;
