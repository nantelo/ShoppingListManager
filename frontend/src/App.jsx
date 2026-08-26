import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

const App = () => {
  return (
   <>
      <Navbar />
      <AllRoutes />
      
    </>
  );
};

export default App;