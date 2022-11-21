import { MutatingDots } from "react-loader-spinner";

import styled from "styled-components";

function LoadingPage() {
  return (
    <LoadingContainer>
      <MutatingDots
        height="100"
        width="100"
        color="#ffffff"
        secondaryColor="#c6c6c6"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>Carregando...</p>
    </LoadingContainer>
  );
}

export default LoadingPage;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #ffffff;
  }
`;
