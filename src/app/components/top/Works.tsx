'use client'
import { CatType, WorkType } from "@/app/const/wp_types";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import WP from "@/app/features/WP";
import BlurAnimation from "../common/BlurAnimation";
import { useFlip, FlipProvider, easeInOutQuint } from 'react-easy-flip'
import { AnimatePresence } from "framer-motion";


const Works = (props: {works: WorkType[], cats: CatType[]}) =>{
    const [works, setWorks] = useState<WorkType[]>(props.works);
    //let works = props.works;
    let showing: boolean[] = [];
    for(let i = 0; i < works.length; i++) showing[i] = true;
    const searchParams = useSearchParams();
    const catsStr = searchParams.get("cat");
    const filterWorks = () =>{
        setWorks([]);
        if(catsStr){
            const cats = catsStr.split(",");
            const ws = props.works.filter((work, i)=>{
                const catNames = work.categories.map(cat=>{
                    return props.cats.filter(rawCat=>rawCat.id==cat)[0].name;
                });
                return WP.isMatchCat(cats, catNames);
            });
            setTimeout(()=>{
                setWorks(ws);
            }, 1000);
        }
        else{
            setTimeout(()=>{
                setWorks(props.works);
            }, 1000);
        }
    }
    useEffect(()=>{
        filterWorks();
    }, [catsStr]);
    return(
        <div className="works grid grid-cols-3" data-flip-root-id="flip-root">
            <AnimatePresence>
                {works.map((work,i)=>showing[i]&&
                    <BlurAnimation key={"work_blur_"+work.id} delay={i} child={
                        <div key={"work_"+work.id} className="h-52">
                            <Link href={"/work/"+work.id}>
                                <img className="object-cover w-full h-full" src={work.acf.thumbnail} alt={work.title.rendered} />
                            </Link>
                        </div>
                    }/>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Works;