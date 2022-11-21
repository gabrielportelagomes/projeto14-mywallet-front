import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingButton from "../../assets/styles/LoadingButton";
import URL from "../../constants/url";
import { useAuth } from "../../provider/auth";

function IncomePage() {
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const [disabledButton, setDisabledButton] = useState(false);
  const [incomeForm, setIncomeForm] = useState({
    value: "",
    description: "",
    category: "income",
  });

  function handleForm(event) {
    const { name, value } = event.target;
    setIncomeForm({ ...incomeForm, [name]: value });
  }

  function convertValue(event) {
    let newValue = event.target.value;
    newValue = newValue.replace(/\D/g, "");
    newValue = newValue.replace(/(\d)(\d{2})$/, "$1,$2");
    newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
    event.target.value = newValue;
    return event;
  }

  function recordIncome(event) {
    event.preventDefault();
    setDisabledButton(true);
    const body = {
      ...incomeForm,
      value: parseInt(incomeForm.value.replace(/[^\d]+/g, "")),
    };

    axios
      .post(`${URL}/records`, body, {
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
        },
      })
      .then(() => navigate("/wallet"))
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <PageContainer>
      <Header>Nova entrada</Header>
      <IncomeForm onSubmit={recordIncome}>
        <Input
          name="value"
          value={incomeForm.value}
          onChange={(e) => handleForm(convertValue(e))}
          type="string"
          placeholder="Valor"
          disabled={disabledButton}
          required
        ></Input>
        <Input
          name="description"
          value={incomeForm.description}
          onChange={handleForm}
          type="string"
          placeholder="Descrição"
          disabled={disabledButton}
          required
        ></Input>
        {disabledButton ? (
          <Button disabled={disabledButton}>
            <LoadingButton />
          </Button>
        ) : (
          <Button type="submit" disabled={disabledButton}>
            Salvar entrada
          </Button>
        )}
      </IncomeForm>
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

const IncomeForm = styled.form`
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
