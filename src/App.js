import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./assets/GlobalStyle";
import ExpensePage from "./pages/ExpensePage/ExpensePage";
import IncomePage from "./pages/IncomePage/IncomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import WalletPage from "./pages/WalletPage/WalletPage";
import { AuthProvider } from "./provider/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <ScreenContainer>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/expense" element={<ExpensePage />} />
          </Routes>
        </ScreenContainer>
      </AuthProvider>
    </BrowserRouter>
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
