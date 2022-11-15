import styled from "styled-components";

function IncomePage() {
  return (
    <PageContainer>
      <Header>Nova entrada</Header>
      <LoginForm>
        <Input placeholder="Valor"></Input>
        <Input placeholder="Descrição"></Input>
        <Button>Salvar entrada</Button>
      </LoginForm>
    </PageContainer>
  );
}

export default IncomePage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  width: 326px;
  display: flex;
  justify-content: space-between;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 26px;
  color: #ffffff;
  margin-top: 25px;
`;

const LoginForm = styled.form`
  width: 326px;
  margin-top: 40px;
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
