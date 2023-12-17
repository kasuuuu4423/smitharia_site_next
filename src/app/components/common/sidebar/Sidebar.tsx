import React from "react"
import Link from "next/link";
import Nav from "./Nav";
import WP from "@/app/features/WP";

const Sidebar = async () => {
    const cats = await WP.getCats();
    return(
        <header className="w-60 mr-10 text-main font-caslon">
            <Link href="/">
                <img className="w-full mb-20" src="/images/logo.svg" alt="smitharia" />
            </Link>
            <Nav cats={cats}/>
        </header>
    );
}

export default Sidebar;