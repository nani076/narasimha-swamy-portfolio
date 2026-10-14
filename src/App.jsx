import {MotionConfig} from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
export default function App(){return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">Skip to content</a><Navbar/><main id="main"><Home/><About/><Skills/><Projects/><Contact/></main><Footer/></MotionConfig>}
