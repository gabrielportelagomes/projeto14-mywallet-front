import styled from "styled-components";

function LoginPage() {
  return (
    <PageContainer>
      <Logo>MyWallet</Logo>
      <LoginForm>
        <Input placeholder="E-mail"></Input>
        <Input placeholder="Senha"></Input>
        <Button>Entrar</Button>
      </LoginForm>
      <SignUp>Primeira vez? Cadastre-se</SignUp>
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
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #000000 !important;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 5px;
  border: none;
  background-color: #a328d6;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
`;

const SignUp = styled.p`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  margin-top: 36px;
  cursor: pointer;
`;
