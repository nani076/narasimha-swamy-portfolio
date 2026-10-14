import {motion,useReducedMotion} from 'framer-motion';
export default function Reveal({children,className=''}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.65}}>{children}</motion.div>}
