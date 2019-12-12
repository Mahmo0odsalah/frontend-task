import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import DivWithErrorHandling from "./errorHandler.js";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const Login = ctx => {
  const { token } = nextCookie(ctx);
  const { username } = nextCookie(ctx);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const firstTime = useRef(true);
  useEffect(() => {
    if (!firstTime.current) {
      return;
    }
    firstTime.current = false;
    if (token && username) {
      router.push("/dashboard/[user]", `/dashboard/${encodeURI(username)}`);
    }
  });
  const router = useRouter();
  let email, password;
  const [error, setError] = useState(null);
  const handleLogin = async event => {
    setError(null);
    email = emailRef.current.value;
    password = passRef.current.value;
    if (!/.+@.+\..+/g.exec(email)) {
      setError("Wrong Email");
    } else if (!password || password.length < 4 || password.length > 8) {
      setError("Password Must Be Between 4 and 8 characters");
    } else {
      await axios
        .post("https://pushbots-fend-challenge.herokuapp.com/login", {
          email: email,
          password: password
        })
        .then(response => {
          cookie.set("token", response.data.token, {
            expires: new Date(new Date().getTime() + 30 * 60 * 1000)
          });
          cookie.set("username", response.data.user.name, {
            expires: new Date(new Date().getTime() + 30 * 60 * 1000)
          });
          router.push(
            "/dashboard/[user]",
            `/dashboard/${encodeURI(response.data.user.name)}`
          );
        })
        .catch(error => {
          setError("Wrong username or password");
        });
    }
  };
  const handleTextChange = event => {
    setError(null);
  };
  return (
    <DivWithErrorHandling showError={error} message={error}>
      <form style={{ width: "100%" }}>
        <h2 style={{ fontWeight: "lighter" }}>Log Into Your Account</h2>
        <TextField
          style={{ width: "100%" }}
          id="input-with-icon-grid"
          label="Email"
          value={email}
          inputRef={el => (emailRef.current = el)}
          onChange={handleTextChange}
        />

        <TextField
          style={{ width: "100%" }}
          id="standard-password-input"
          label="Password"
          type="password"
          inputRef={el => (passRef.current = el)}
          onChange={handleTextChange}
        />
        <Button
          style={{
            width: "100%",
            marginTop: "2%",
            backgroundColor: "#009688",
            color: "white"
          }}
          variant="contained"
          size="medium"
          name="login"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </DivWithErrorHandling>
  );
};
export default Login;
