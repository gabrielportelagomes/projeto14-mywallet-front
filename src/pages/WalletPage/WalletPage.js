import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../provider/auth";
import URL from "../../constants/url";
import { useEffect, useState } from "react";
import Record from "../../components/Record";
import LoadingPage from "../../assets/styles/LoadingPage";
import LoadingSignOut from "../../assets/styles/LoadingSignOut";
import LoadingDelete from "../../assets/styles/LoadingDelete";

function WalletPage() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useAuth();
  const [user, setUser] = useState(undefined);
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState("");
  const [balanceColor, setBalanceColor] = useState("#000000");
  const [update, setUpdate] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(false);

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
          setDeleteRecord(false);
        })
        .catch((error) => console.log(error.response.data.message));
    }
  }, [userLogin, update]);

  function calculateBalance(allRecords) {
    let newBalance = 0;
    allRecords.forEach((record) => {
      if (record.category === "income") {
        newBalance += parseInt(record.value);
      } else {
        newBalance -= parseInt(record.value);
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
    setDisabledButton(true);

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
    return (
      <PageContainer>
        <LoadingPage />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {disabledButton && (
        <SignOutLoading>
          <LoadingSignOut />
        </SignOutLoading>
      )}
      <Navbar>
        <Header>Olá, {user.name.split(" ")[0]}</Header>
        <SignOut onClick={signOut}>
          <RiLogoutBoxRLine />
        </SignOut>
      </Navbar>
      {records.length === 0 ? (
        <EmptyDashboard>
          <p>Não há registros de entrada ou saída</p>
        </EmptyDashboard>
      ) : (
        <Dashboard>
          <Records>
            {records.map((record, id) => (
              <Record
                key={id}
                record={record}
                update={update}
                setUpdate={setUpdate}
                setDeleteRecord={setDeleteRecord}
              />
            ))}
          </Records>
          <Balance color={balanceColor}>
            <p>SALDO</p>
            <span>{balance}</span>
          </Balance>
          {deleteRecord && (
            <DashboardLoading>
              <LoadingDelete />
            </DashboardLoading>
          )}
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

const SignOutLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #ffffff;
  opacity: 0.7;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  z-index: 1;
`;

const Navbar = styled.div`
  width: 326px;
  height: 26px;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h1`
  width: 300px;
  height: 26px;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 26px;
  color: #ffffff;
  word-wrap: break-word;
  hyphens: auto;
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

const DashboardLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 5px;
  background-color: #ffffff;
  opacity: 0.8;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  z-index: 1;
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
