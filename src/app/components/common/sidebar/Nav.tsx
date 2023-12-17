'use client'
import React, { useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ReconstructCatsType } from "@/app/const/wp_types";

const Nav = (props: {cats: ReconstructCatsType}) =>{
    const searchParams = useSearchParams();
    const router = useRouter();
    const paramsStr = searchParams.get("cat");
    let params: string[] = [];
    if(paramsStr){
        params = paramsStr.split(",");
    }
    const [currentCats, setCurrentCats] = useState<string[]>(params);
    const [currentParam, setCurrentParam] = useState<string>("");
    const toggleParam = (paramName: string) =>{
        const url = new URL(window.location.href);
        searchParams.set
        const paramsStr = searchParams.get("cat");
        if(paramsStr){
            const params = paramsStr.split(",");
            const isExist = params.filter(p=>p===paramName).length > 0;
            if(isExist){
                const nParams = params.filter(p=>p!==paramName);
                if(nParams.length > 0){
                    url.searchParams.set("cat", nParams.toString());
                }
                else{
                    url.searchParams.delete("cat");
                }
                //history.pushState(null, "", url.toString());
                setCurrentCats(nParams);
                //window.location.href = url.toString();
            }
            else{
                params.push(paramName);
                url.searchParams.set("cat", params.toString());
                //history.pushState(null, "", url.toString());
                //window.location.href = url.toString();
                setCurrentCats(params);
            }
        }
        else{
            url.searchParams.set("cat", paramName);
            //history.pushState(null, "", url.toString());
            //window.location.href = url.toString();
            setCurrentCats([paramName]);
        }
        setCurrentParam(url.searchParams.toString());
        router.push(url.toString());
    }
    
    return(
        <nav className="sticky top-5">
            <NavItem className="mb-5" display="about us" link="/aboutus"/>
            <NavItem className="mb-5" display="all project" link="/" onClick={()=>{setCurrentCats([])}}/>
            <div>
                works
                <div className="ml-5 mb-5">
                    {props.cats.works.map(item=>
                        <NavItem className={currentCats.filter(cat=>item.name==cat).length>0?"text-black ":""} key={item.name} display={item.name} onClick={()=>{toggleParam(item.name)}}/>
                    )}
                </div>
            </div>
            <div>
                studies
                <div className="ml-5 mb-5">
                    {props.cats.studies.map(item=>
                        <NavItem className={currentCats.filter(cat=>item.name==cat).length>0?"text-black ":""} key={item.name} display={item.name} onClick={()=>{toggleParam(item.name)}}/>
                    )}
                </div>
            </div>
            <div>
                artists
                <div className="ml-5">
                    {props.cats.artists.map(item=>
                        <NavItem className={currentCats.filter(cat=>item.name==cat).length>0?"text-black ":""} key={item.name} display={item.name} onClick={()=>{toggleParam(item.name)}}/>
                    )}
                </div>
            </div>
        </nav>
    );
}

const NavItem = (props: {className?: string, display: string, link?: string, onClick?: ()=>void}) =>{
    return(
        <div className={props.className+"mb-1 hover:text-black duration-200	"} onClick={props.onClick}>
            {props.link?
                <Link href={props.link}>{props.display}</Link>:
                <button>{props.display}</button>
            }
        </div>
    );
}

export default Nav;