import { faUser, faFilm, faGear, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SideBar = ({menu, setMenu}) => {
    
    return (
        <div className="w-[12%] h-full">
            <div className="w-[100%] min-h-screen p-4 bg-white shadow-lg border-2 rounded-xl">
                <div className="flex flex-col justify-center gap-6 w-[100%]">
                    {[
                        { icon: faUser, label: "User" },
                        { icon: faFilm, label: "Film" },
                        { icon: faGear, label: "System" },
                        { icon: faDoorOpen, label: "SignOut" },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setMenu(index)}
                            className={`px-2 py-3 rounded-full font-nunito font-semibold transform transition-all duration-300 hover:shadow-xl hover:border-2 
                                ${menu === index ? "bg-navy-blue-500 text-white" : "hover:shadow-slate-400"}`}
                        >
                            <FontAwesomeIcon icon={item.icon} size="xl" className="mr-3" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SideBar;