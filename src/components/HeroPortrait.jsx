import {useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {asset} from '../data/personalInfo';
export default function HeroPortrait(){
  const [failed,setFailed]=useState(false);
  const reduced=useReducedMotion();
  return <motion.div className="portrait-wrap" initial={reduced?false:{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:1,ease:'easeOut'}}>
    <div className="portrait-orbit" aria-hidden="true"/>
    <motion.div className="portrait-frame" animate={reduced?{}:{y:[0,-5,0]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}} whileHover={reduced?{}:{scale:1.012}}>
      {failed?<div className="portrait-fallback" role="img" aria-label="Narasimha Swamy portrait unavailable">NS</div>:<img src={asset('images/profile-standing.png')} alt="Narasimha Swamy standing naturally in a white shirt" width="1038" height="1515" fetchPriority="high" onError={()=>setFailed(true)}/>}
    </motion.div>
    <div className="portrait-caption"><span>NARASIMHA SWAMY</span><span>HYDERABAD, INDIA ↗</span></div>
    <span className="portrait-side">DEVELOPER. THINKER. BUILDER.</span>
  </motion.div>
}
