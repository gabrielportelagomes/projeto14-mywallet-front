import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import URL from "../../constants/url";
import { useAuth } from "../../provider/auth";
import { useRecord } from "../../provider/record";
import { BiHome } from "react-icons/bi";

function EditExpense() {
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const { editRecord } = useRecord();

  const [editExpenseForm, setEditExpenseForm] = useState({
    value: (editRecord.value / 100)
      .toFixed(2)
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, "."),
    description: editRecord.description,
    category: editRecord.category,
  });

  function handleForm(event) {
    const { name, value } = event.target;
    setEditExpenseForm({ ...editExpenseForm, [name]: value });
  }

  function convertValue(event) {
    let newValue = event.target.value;
    newValue = newValue.replace(/\D/g, "");
    newValue = newValue.replace(/(\d)(\d{2})$/, "$1,$2");
    newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
    event.target.value = newValue;
    return event;
  }

  function updateExpense(event) {
    event.preventDefault();
    const body = {
      ...editExpenseForm,
      value: parseInt(editExpenseForm.value.replace(/[^\d]+/g, "")),
    };

    axios
      .put(`${URL}/records/${editRecord._id}`, body, {
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
        },
      })
      .then(() => navigate("/wallet"))
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  function backHome() {
    const confirm = window.confirm(
      "As alterações serão perdidas, deseja continuar?"
    );
    if (confirm) {
      navigate("/");
    }
  }

  return (
    <PageContainer>
      <Header>
        <h1>Editar saída</h1>
        <Icon onClick={backHome}>
          <BiHome />
        </Icon>
      </Header>
      <ExpenseForm onSubmit={updateExpense}>
        <Input
          name="value"
          value={editExpenseForm.value}
          onChange={(e) => handleForm(convertValue(e))}
          type="string"
          placeholder="Valor"
          required
        ></Input>
        <Input
          name="description"
          value={editExpenseForm.description}
          onChange={handleForm}
          type="string"
          placeholder="Descrição"
          minLength="1"
          maxLength="30"
          required
        ></Input>
        <Button type="submit">Atualizar saída</Button>
      </ExpenseForm>
    </PageContainer>
  );
}

export default EditExpense;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 326px;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  h1 {
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
  }
`;

const Icon = styled.p`
  font-size: 26px;
  color: #ffffff;
  cursor: pointer;
`;

const ExpenseForm = styled.form`
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
