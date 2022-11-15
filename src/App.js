import styled from "styled-components";
import GlobalStyle from "./assets/GlobalStyle";

function App() {
  return (
    <div>
      <GlobalStyle />
      <ScreenContainer></ScreenContainer>
    </div>
  );
}

export default App;

const ScreenContainer = styled.main`
  width: 375px;
  height: 667px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: #8c11be; ;
`;
