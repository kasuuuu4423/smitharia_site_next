'use client'
import { CatType, WorkType } from "@/app/const/wp_types";
import React from "react";
import parse from 'html-react-parser';
import BlurAnimation from "../common/BlurAnimation";
import { AnimatePresence } from "framer-motion";

const WorkDetail = (props: {work: WorkType, cats: CatType[]}) =>{
    const catNames = props.work.categories.map(cat=>{
        return props.cats.filter(rawCat=>rawCat.id==cat)[0].name;
    });
    return(
        <AnimatePresence>

            <BlurAnimation delay={2} child={
                <img className="w-full mb-10" src={props.work.acf.thumbnail} alt={props.work.title.rendered} />
            }/>
            <h1 className="text-3xl font-caslon mb-2">
                {props.work.title.rendered}
            </h1>
            <div className="mb-5">
                {catNames.map(catName=><span key={catName}>{catName} / </span>)}
            </div>
            <div className="flex mb-32">
                <div className="credit whitespace-pre-wrap w-2/5">
                    credit:<br/>
                    {props.work.acf.credit}
                </div>
                <div className="description w-3/5">
                    {parse(props.work.acf.description)}
                </div>
            </div>
            <div>
                {parse(props.work.content.rendered)}
            </div>
        </AnimatePresence>
    );
}

export default WorkDetail;