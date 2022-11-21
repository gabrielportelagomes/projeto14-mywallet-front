import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import URL from "../../constants/url";
import LoadingButton from "../../assets/styles/LoadingButton";

function SignUpPage() {
  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleForm(event) {
    const { name, value } = event.target;
    if (name === "confirmPassword" && errorPassword === true) {
      setErrorPassword(false);
    }
    setSignUpForm({ ...signUpForm, [name]: value });
  }

  function signUp(event) {
    event.preventDefault();
    setDisabledButton(true);

    if (signUpForm.password === signUpForm.confirmPassword) {
      const body = {
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password,
      };
      axios
        .post(`${URL}/sign-up`, body)
        .then(() => navigate("/"))
        .catch((error) => {
          alert(error.response.data.message);
          setDisabledButton(false);
        });
    } else {
      setErrorPassword(true);
      setDisabledButton(false);
    }
  }

  return (
    <PageContainer>
      <Logo>MyWallet</Logo>
      <SignUpForm onSubmit={signUp}>
        <Input
          name="name"
          value={signUpForm.name}
          onChange={handleForm}
          type="text"
          placeholder="Nome"
          minLength="3"
          maxLength="50"
          disabled={disabledButton}
          required
        ></Input>
        <Input
          name="email"
          value={signUpForm.email}
          onChange={handleForm}
          type="email"
          placeholder="E-mail"
          disabled={disabledButton}
          required
        ></Input>
        <Input
          name="password"
          value={signUpForm.password}
          onChange={handleForm}
          type="password"
          placeholder="Senha"
          minLength="5"
          disabled={disabledButton}
          required
        ></Input>
        <InputConfirm
          name="confirmPassword"
          value={signUpForm.confirmPassword}
          onChange={handleForm}
          type="password"
          placeholder="Confirme a senha"
          minLength="5"
          disabled={disabledButton}
          errorPassword={errorPassword}
          required
        ></InputConfirm>
        {errorPassword && <Error>As senhas não conferem!</Error>}
        {disabledButton ? (
          <Button disabled={disabledButton}>
            <LoadingButton />
          </Button>
        ) : (
          <Button type="submit" disabled={disabledButton}>
            Cadastrar
          </Button>
        )}
      </SignUpForm>
      {disabledButton ? (
        <Login>Já tem uma conta? Entre agora!</Login>
      ) : (
        <Link to="/">
          <Login>Já tem uma conta? Entre agora!</Login>
        </Link>
      )}
    </PageContainer>
  );
}

export default SignUpPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-weight: 400;
  font-size: 32px;
  color: #ffffff;
`;

const SignUpForm = styled.form`
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

const InputConfirm = styled(Input)`
  border: ${(props) => (props.errorPassword ? "3px solid red" : "none")};
`;

const Error = styled.p`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 13px;
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

const Login = styled.p`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  margin-top: 36px;
`;
