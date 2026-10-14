import {ArrowUp} from 'lucide-react';
import SocialLinks from './SocialLinks';
export default function Footer(){return <footer className="container footer"><div className="footer-top"><div><a href="#home" className="wordmark">Narasimha Swamy</a><p>Python Full Stack Developer | Data Analyst</p></div><SocialLinks/></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Narasimha Swamy. All Rights Reserved.</span><a href="#home">Back to top <ArrowUp size={16}/></a></div></footer>}
