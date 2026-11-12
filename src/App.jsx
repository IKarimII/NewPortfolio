import SmoothScroll from "./SmoothScroll.jsx";
import Header from "./Header.jsx";
import Info from "./Info.jsx";
import Projects from "./Projects.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div className="w-full bg-black">
      <SmoothScroll />
      <Header />
      <Info />
      <Projects/>
      <Footer/>
    </div>
  );
}

export default App;
