import "./App.css";
import Invoices from "./Invoices/Invoices";
import Wrapper from "./Wrapper/Wrapper";
import ProvideThemes from "./Components/shared/Provider/Provider";
import FormControlls from "./Components/Form//FormControlls";
import { AppContexProvider } from "./Provider/GlobalContex";
import { useContext } from "react";

function App() {
  const { openForm } = useContext(AppContexProvider);

  return (
    <ProvideThemes>
      <Wrapper>
        {openForm && <FormControlls />}
        <Invoices />
      </Wrapper>
    </ProvideThemes>
  );
}

export default App;
