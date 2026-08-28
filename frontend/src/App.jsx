import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import Footer from "./components/Footer";
const App = () => {
  return (
   <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;