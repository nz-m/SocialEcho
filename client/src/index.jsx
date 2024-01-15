import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppContainer from "./AppContainer";
import { Nightprovider } from "./context/NightModeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
   <Nightprovider>
    <AppContainer />
   </Nightprovider>
  </BrowserRouter>
  
);
