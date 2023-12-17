import React from "react";
import { motion } from "framer-motion";
import path from "path";

const BlurAnimation = (props: {key?: string, child: JSX.Element, delay?: number}) =>{
    return(
            <motion.div
                initial={{
                    opacity: 0,
                    filter: 'blur(15px)'
                }}
                animate={{
                    opacity: 1,
                    filter: 'blur(0px)'
                }}
                exit={{
                    opacity: 0,
                    filter: 'blur(15px)'
                }}
                transition={{delay: props.delay?props.delay*0.05:0.05, duration: 0.4}}
                className="work"
                key={props.key}
            >
                {props.child}
            </motion.div>
    );
}

export default BlurAnimation;