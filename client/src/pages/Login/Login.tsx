import React from "react";
import styles from "./Login.module.scss";
import { Field, Form } from "react-final-form";
import { BiHide, BiShow } from "react-icons/bi";

export default function Login() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="container">
      <h2 className={styles.logo}>AdvancedTodo</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2 className={styles.welcome}>Welcome !</h2>
            <h2>Log in to</h2>
            <p className={styles.titleP}>your account</p>
            <div className={styles.email}>
              <label>Email</label>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className={styles.password}>
              <label>Password</label>
              <Field
                name="password"
                component="input"
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
              />
              <span>
                {passwordShown ? (
                  <BiHide onClick={() => setPasswordShown(!passwordShown)} />
                ) : (
                  <BiShow onClick={() => setPasswordShown(!passwordShown)} />
                )}
              </span>
            </div>
            <div className={styles.remember}>
              <div className={styles.rememberMe}>
                <Field name="rememberMe" component="input" type="checkbox" />
                <label>Remember me</label>
              </div>
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password ?</a>
              </div>
            </div>

            <button type="submit">Submit</button>

            <div className={styles.signUp}>
              <p>Don't have an account?</p>
              <a href="#">Register</a>
            </div>
          </form>
        )}
      />
    </div>
  );
}
