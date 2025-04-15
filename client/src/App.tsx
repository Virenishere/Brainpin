import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import BrainPinMain from "./pages/BrainPinMain";
import Benefits from "./pages/Benefits";
import HowItWorks from "./pages/HowItWorks";

const App = () => {
  return(
 <Routes>

  {/* public layout  */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/about" element={<About />} />
    <Route path="/benefits" element={<Benefits />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
  </Route>

  {/* private layout  */}
  <Route element={<PrivateLayout/>}>
  <Route path="/dashboard" element={<BrainPinMain />}/>
  </Route>

  <Route path="*" element={<NotFound/>}/>
 </Routes>
    )
}

export default App;