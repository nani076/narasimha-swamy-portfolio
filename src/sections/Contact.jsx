import {useMemo,useState} from 'react';
import {ArrowUpRight,MapPin,LoaderCircle} from 'lucide-react';
import {personalInfo as p} from '../data/personalInfo';
import {configuredFormId,createContactSubmission} from '../lib/contactSubmission';
import Reveal from '../components/Reveal';
const formId=configuredFormId(import.meta.env.VITE_FORMSPREE_FORM_ID);
export default function Contact(){
  const [status,setStatus]=useState('idle');
  const [message,setMessage]=useState('');
  const [inputsValid,setInputsValid]=useState(false);
  const submit=useMemo(()=>createContactSubmission({formId,onStatus:setStatus,onMessage:setMessage}),[]);
  function updateValidity(event){
    event.target.setCustomValidity?.('');
    const form=event.currentTarget;
    const requiredFields=['name','email','subject','message'];
    setInputsValid(form.checkValidity()&&requiredFields.every(name=>form.elements.namedItem(name).value.trim().length>0));
  }
  return <section id="contact" className="section light-section"><div className="container"><Reveal>
    <div className="section-label">04 — GET IN TOUCH</div>
    <div className="contact-grid"><div>
      <h2>LET’S WORK<br/><span>TOGETHER</span><span className="contact-dot">.</span></h2>
      <p className="contact-intro">Have an opportunity, a project idea, or just want to say hello? I’d love to connect.</p>
      <p className="location"><MapPin size={17}/>{p.location}</p>
      <div className="contact-links">
        <a href={p.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={19}/></a>
        <a href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={19}/></a>
        <a href={`mailto:${p.email}`}>{p.email}<ArrowUpRight size={19}/></a>
      </div>
    </div>
    <form onSubmit={submit} onInput={updateValidity} onChange={updateValidity} onReset={()=>setInputsValid(false)} className="contact-form" aria-busy={status==='loading'} aria-describedby="contact-configuration">
      <fieldset disabled={status==='loading'}>
        <div className="form-row">
          <label>Full Name<input name="name" autoComplete="name" placeholder="Full name" required maxLength={100}/></label>
          <label>Email Address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254}/></label>
        </div>
        <label>Subject<input name="subject" placeholder="What’s on your mind?" required maxLength={200}/></label>
        <label>Message<textarea name="message" placeholder="Tell me a little about it…" required minLength={10} maxLength={5000} rows={4}/></label>
        <input type="text" name="_gotcha" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      </fieldset>
      <p id="contact-configuration" className="form-note">{formId?"Have a question or opportunity? Send me a message and I'll get back to you.":<>The contact form is not connected yet. Please <a href={`mailto:${p.email}`}>email me directly</a>.</>}</p>
      <button type="submit" className="button dark" disabled={!formId||!inputsValid||status==='loading'}>
        {status==='loading'?<>Sending <LoaderCircle className="spin" size={16}/></>:<>Send Message <ArrowUpRight size={17}/></>}
      </button>
      <p role="status" aria-live="polite" aria-atomic="true" className={`form-status ${status}`}>{message}</p>
    </form></div>
  </Reveal></div></section>
}
