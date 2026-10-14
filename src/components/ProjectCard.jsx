import {ExternalLink,ScanLine,Layers,Image} from 'lucide-react';
import {asset} from '../data/personalInfo';
function ProjectPreview({project:p}){
  if(p.screenshot)return <img src={asset(p.screenshot)} alt={`${p.title} application screenshot`} loading="lazy"/>;
  if(p.preview==='portfolio')return <div className="portfolio-preview" role="img" aria-label="Placeholder illustrating Narasimha Swamy’s current homepage with the arched bordered portrait; not an actual screenshot"><div className="mini-nav"><strong>Narasimha Swamy.</strong><span>HOME / ABOUT / SKILLS / PROJECTS / CONTACT</span></div><div className="mini-hero"><div><span className="eyebrow">HELLO, I’M</span><strong>NARASIMHA SWAMY</strong><p>Python Full Stack Developer<br/>Data Analyst</p><span className="mini-button">VIEW PROJECTS ↗</span><span className="mini-resume">DOWNLOAD RESUME</span></div><div className="mini-portrait"><div className="mini-portrait-frame"><img src={asset('images/profile-standing.png')} alt="" loading="lazy"/></div><div className="mini-portrait-caption">NARASIMHA SWAMY · HYDERABAD</div><span className="mini-portrait-side">DEVELOPER. THINKER. BUILDER.</span></div></div><div className="mini-bottom">CODE WITH PURPOSE. BUILD WITH CURIOSITY.</div><span className="placeholder-label">ILLUSTRATIVE DESIGN PREVIEW · NOT A SCREENSHOT</span></div>;
  return <div className="screenshot-placeholder"><div className="visual-toolbar"><span/><span/><span/><small>MEDICAL IMAGE FUSION</small></div><div className="visual-panels"><div><Image size={32}/><span>INPUT</span></div><span className="fusion-plus">+</span><div><Layers size={32}/><span>PROCESS</span></div><span className="fusion-plus">→</span><div><ScanLine size={32}/><span>RESULT</span></div></div><span className="placeholder-label">SCREENSHOT PLACEHOLDER · ACTUAL IMAGES COMING SOON</span></div>
}
export default function ProjectCard({project:p}){
  const destination=p.demo||p.repository;
  return <article className={`project-card${destination?' is-interactive':''}`}>
    <div className="project-visual"><ProjectPreview project={p}/></div>
    <div className="project-detail">
      <span className="eyebrow">{p.category}</span>
      {p.status&&<p className="project-status">{p.status}</p>}
      <h3>{destination?<a className="project-title-link" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} — open ${p.demo?'live website':'GitHub repository'} in a new tab`}>{p.title}</a>:p.title}</h3>
      <p>{p.description}</p>
      <ul>{p.features.map(f=><li key={f}>{f}</li>)}</ul>
      <div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
      {(p.repository||p.demo)&&<div className="project-links">
        {p.demo&&<a href={p.demo} target="_blank" rel="noopener noreferrer">{p.demoLabel||'View Live Demo'} <ExternalLink size={15} aria-hidden="true"/></a>}
        {p.repository&&<a href={p.repository} target="_blank" rel="noopener noreferrer">{p.repositoryLabel||'View Project on GitHub'} <ExternalLink size={15} aria-hidden="true"/></a>}
      </div>}
    </div>
  </article>
}
