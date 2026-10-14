import { Download } from 'lucide-react';
import {personalInfo as p,asset} from '../data/personalInfo';
export default function ResumeButton({className='button secondary'}){return p.resume ? <a className={className} href={asset(p.resume)} download="Narasimha_Swamy_Resume.pdf">Download Resume <Download size={15}/></a> : <button className={className} type="button" disabled title="The resume PDF is currently unavailable" aria-label="Download Resume — currently unavailable">Download Resume <Download size={15}/></button>}
