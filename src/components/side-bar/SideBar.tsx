import {Outlet} from "react-router-dom";
import Menu from "../menu/Menu.tsx";
import {useEffect} from "react";

const SideBar = () => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (

        <div className="flex h-screen">


            <aside
                className="w-48 bg-gradient-to-b from-pink-500 via-rose-300 to-orange-500 text-white p-4 flex-shrink-0">
                <Menu/>
            </aside>


            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <Outlet/>
            </main>
        </div>


    );
};


export default SideBar;