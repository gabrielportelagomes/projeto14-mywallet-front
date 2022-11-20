import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../provider/auth";
import URL from "../constants/url";

function Record({ record, update, setUpdate }) {
  const { userLogin } = useAuth();
  const { description, category } = record;
  const id = record._id;
  const date = record.date.split("/")[0] + "/" + record.date.split("/")[1];
  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(record.value / 100);

  function colorCategory(category) {
    if (category === "income") {
      return "#03ac00";
    } else {
      return "#c70000";
    }
  }

  function deleteRecord(id) {
    const confirm = window.confirm("Dejesa excluir esse registro?");
    if (confirm) {
      axios
        .delete(`${URL}/records/${id}`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        })
        .then(() => setUpdate(!update))
        .catch((error) => console.log(error.response.data.message));
    }
  }

  return (
    <RecordContainer>
      <Date>{date}</Date>
      <Description>{description}</Description>
      <Value color={colorCategory(category)}>{value}</Value>
      <Delete onClick={() => deleteRecord(id)}>x</Delete>
    </RecordContainer>
  );
}

export default Record;

const RecordContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  p {
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size: 16px;
    word-wrap: break-word;
  }
`;

const Date = styled.p`
  width: 48px;
  color: #c6c6c6;
`;

const Description = styled.p`
  margin-left: 5px;
  width: 160px;
  text-align: left;
  color: #000000;
`;

const Value = styled.p`
  margin-left: 5px;
  color: ${(props) => props.color};
`;

const Delete = styled.p`
  margin-left: 10px;
  color: #c6c6c6;
  cursor: pointer;
`;
