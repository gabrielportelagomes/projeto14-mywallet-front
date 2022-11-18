import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../provider/auth";
import URL from "../../constants/url";

function WalletPage() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useAuth();

  function signOut() {
    axios
      .delete(`${URL}/sign-out`, {
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("userMyWallet");
        setUserLogin(undefined);
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <PageContainer>
      <Header>
        <p>Olá, Usuário</p>
        <SignOut onClick={signOut}>
          <RiLogoutBoxRLine />
        </SignOut>
      </Header>
      <Dashboard>
        <p>Não há registros de entrada ou saída</p>
      </Dashboard>
      <Options>
        <Link to="/income">
          <Button>
            <Icon>
              <FiPlusCircle />
            </Icon>
            <p>Nova entrada</p>
          </Button>
        </Link>
        <Link to="/expense">
          <Button>
            <Icon>
              <FiMinusCircle />
            </Icon>
            <p>Nova saída</p>
          </Button>
        </Link>
      </Options>
    </PageContainer>
  );
}

export default WalletPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  width: 326px;
  display: flex;
  justify-content: space-between;
  p {
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
  }
`;

const SignOut = styled.span`
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
`;

const Dashboard = styled.div`
  width: 326px;
  height: 446px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 26px;
  p {
    width: 180px;
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #868686;
  }
`;

const Options = styled.div`
  width: 326px;
  height: 114px;
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
`;

const Button = styled.button`
  width: 155px;
  height: 114px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  border-radius: 5px;
  background-color: #a328d6;
  cursor: pointer;
  p {
    width: 64px;
    margin: 10px;
    text-align: left;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: #ffffff;
  }
`;

const Icon = styled.span`
  font-size: 25px;
  color: #ffffff;
  margin: 10px;
`;
