import React from "react";
import axios from "./axios";

function App() {
  const handleRegister = () => {
    let data = {
      username: "bkefkfak",
      email: "bkefkfak@gmail.com",
      password1: "abcdef12345678",
      password2: "abcdef12345678",
    };
    axios
      .post("auth/registration/", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("clicked");
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={handleRegister}>REgister</button>
    </div>
  );
}

export default App;
