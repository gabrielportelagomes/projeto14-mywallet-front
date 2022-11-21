import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../provider/auth";
import URL from "../../constants/url";
import LoadingButton from "../../assets/styles/LoadingButton";
import { GiWallet } from "react-icons/gi";

function LoginPage() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useAuth();
  const [disabledButton, setDisabledButton] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (userLogin !== undefined) {
      navigate("/wallet");
    }
  }, [userLogin]);

  function handleForm(event) {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  function login(event) {
    event.preventDefault();
    setDisabledButton(true);

    const body = loginForm;

    axios
      .post(`${URL}/sign-in`, body)
      .then((response) => {
        setUserLogin(response.data);
        localStorage.setItem("userMyWallet", JSON.stringify(response.data));
        navigate("/wallet");
      })
      .catch((error) => {
        alert(error.response.data.message);
        setDisabledButton(false);
      });
  }

  return (
    <PageContainer>
      <Icon>
        <GiWallet />
      </Icon>
      <Logo>MyWallet</Logo>
      <LoginForm onSubmit={login}>
        <Input
          name="email"
          value={loginForm.email}
          onChange={handleForm}
          type="email"
          placeholder="E-mail"
          disabled={disabledButton}
          required
        ></Input>
        <Input
          name="password"
          value={loginForm.password}
          onChange={handleForm}
          type="password"
          placeholder="Senha"
          minLength="5"
          disabled={disabledButton}
          required
        ></Input>
        {disabledButton ? (
          <Button disabled={disabledButton}>
            <LoadingButton />
          </Button>
        ) : (
          <Button type="submit" disabled={disabledButton}>
            Entrar
          </Button>
        )}
      </LoginForm>
      {disabledButton ? (
        <SignUp>Primeira vez? Cadastre-se!</SignUp>
      ) : (
        <Link to="/sign-up">
          <SignUp>Primeira vez? Cadastre-se!</SignUp>
        </Link>
      )}
    </PageContainer>
  );
}

export default LoginPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.p`
  font-size: 50px;
  color: #ffffff;
`;

const Logo = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-weight: 400;
  font-size: 32px;
  color: #ffffff;
`;

const LoginForm = styled.form`
  width: 326px;
  margin-top: 24px;
`;

const Input = styled.input`
  width: 100%;
  height: 58px;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  margin-bottom: 13px;
  padding: 15px;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #000000 !important;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: #a328d6;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  cursor: ${(props) => (props.disabled ? "cursor" : "pointer")};
`;

const SignUp = styled.p`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  margin-top: 36px;
`;
