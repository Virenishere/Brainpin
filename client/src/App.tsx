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
import SharedPost from "./pages/SharedPost";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/shared/:postId" element={<SharedPost />} />
        </Route>

        {/* Private layout */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<BrainPinMain />} />
          <Route path="/dashboard/tags" element={<BrainPinMain />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster theme="system" richColors />
    </div>
  );
};

export default App;