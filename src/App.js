// JavaScript code for App.js

import Invoices from "./Invoices/Invoices";
import Wrapper from "./Wrapper/Wrapper";
import ProvideThemes from "./Components/shared/Provider/Provider";
import FormControlls from "./Components/Form//FormControlls";
import { AppContexProvider } from "./Provider/GlobalContex";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import InvoiceView from "./InvoiceView/InvoiceView";

function App() {
  const { openForm, isEditting } = useContext(AppContexProvider);

  return (
    // if you want light mode pass a light prop to the  themeColor
    <ProvideThemes themeColor={"dark"}>
      <Wrapper>
        {openForm && <FormControlls isEditting={isEditting} />}
        <Routes>
          <Route exact path="/" element={<Invoices />} />
          <Route path="/invoice/:id" element={<InvoiceView />} />
        </Routes>
      </Wrapper>
    </ProvideThemes>
  );
}

export default App;
