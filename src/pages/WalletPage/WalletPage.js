import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../provider/auth";
import URL from "../../constants/url";
import { useEffect, useState } from "react";
import Record from "../../components/Record";

function WalletPage() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useAuth();
  const [user, setUser] = useState(undefined);
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState("");
  const [balanceColor, setBalanceColor] = useState("#000000");

  useEffect(() => {
    if (userLogin !== undefined) {
      axios
        .get(`${URL}/users`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.log(error.response.data.message));
    }
  }, [userLogin]);

  useEffect(() => {
    if (userLogin !== undefined) {
      axios
        .get(`${URL}/records`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        })
        .then((response) => {
          setRecords(response.data);
          calculateBalance(response.data);
        })
        .catch((error) => console.log(error.response.data.message));
    }
  }, [userLogin]);

  function calculateBalance(allRecords) {
    let newBalance = 0;
    allRecords.forEach((record) => {
      if (record.category === "income") {
        newBalance += record.value;
      } else {
        newBalance -= record.value;
      }
    });

    if (newBalance > 0) {
      setBalanceColor("#03ac00");
    } else if (newBalance < 0) {
      setBalanceColor("#c70000");
    } else {
      setBalanceColor("#000000");
    }

    setBalance(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Math.abs(newBalance) / 100)
    );
  }

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

  if (userLogin === undefined || records === undefined || user === undefined) {
    return <p>Carregando...</p>;
  }

  return (
    <PageContainer>
      <Header>
        <p>Olá, {user.name.split(" ")[0]}</p>
        <SignOut onClick={signOut}>
          <RiLogoutBoxRLine />
        </SignOut>
      </Header>
      {records.length === 0 ? (
        <EmptyDashboard>
          <p>Não há registros de entrada ou saída</p>
        </EmptyDashboard>
      ) : (
        <Dashboard>
          <Records>
            {records.map((record, id) => (
              <Record key={id} record={record} />
            ))}
          </Records>
          <Balance color={balanceColor}>
            <p>SALDO</p>
            <span>{balance}</span>
          </Balance>
        </Dashboard>
      )}

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

const EmptyDashboard = styled.div`
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

const Dashboard = styled.div`
  width: 326px;
  height: 446px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 26px;
  position: relative;
`;

const Records = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 23px 0 40px 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Balance = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  p {
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: #000000;
  }
  span {
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size: 17px;
    color: ${(props) => props.color};
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
