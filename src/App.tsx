import {Outlet} from "react-router-dom";
import Header from "./components/header/Header.tsx";
import SideBar from "./components/side-bar/SideBar.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {


  return (
    <div>

        <Header/>
        <SideBar/>
        <Outlet/>
    </div>


  )
}

export default App
