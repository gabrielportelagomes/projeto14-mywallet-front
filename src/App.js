import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./assets/GlobalStyle";
import EditIncome from "./pages/EditIncome/EditIncome";
import ExpensePage from "./pages/ExpensePage/ExpensePage";
import IncomePage from "./pages/IncomePage/IncomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import WalletPage from "./pages/WalletPage/WalletPage";
import { AuthProvider } from "./provider/auth";
import { RecordProvider } from "./provider/record";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RecordProvider>
          <GlobalStyle />
          <ScreenContainer>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/income" element={<IncomePage />} />
              <Route path="/expense" element={<ExpensePage />} />
              <Route path="/edit-income" element={<EditIncome />} />
            </Routes>
          </ScreenContainer>
        </RecordProvider>
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
