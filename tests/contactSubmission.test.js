import test from 'node:test';
import assert from 'node:assert/strict';
import {configuredFormId,createContactSubmission,SUCCESS_MESSAGE,ERROR_MESSAGE} from '../src/lib/contactSubmission.js';

function setup({request = async () => ({ok:true}), formId = 'testform', valid = true, values = {}} = {}) {
  const states=[],messages=[],calls=[];
  const data=new FormData();
  for(const [key,value] of Object.entries({name:' Visitor ',email:'visitor@example.com',subject:' Hello ',message:'A meaningful project enquiry.',...values}))data.set(key,value);
  let resets=0,validationError='';
  const form={reportValidity:()=>valid,elements:{namedItem:()=>({setCustomValidity:value=>{validationError=value}})},reset:()=>resets++};
  const submit=createContactSubmission({formId,onStatus:value=>states.push(value),onMessage:value=>messages.push(value),request:async(...args)=>{calls.push(args);return request(...args)},createData:()=>data});
  return {submit,event:{preventDefault(){},currentTarget:form},states,messages,calls,data,resets:()=>resets,validationError:()=>validationError};
}

test('only configured form IDs are accepted; template and endpoint URLs are rejected',()=>{
  for(const value of [undefined,'','  ','your_form_id_here','YOUR_ACTUAL_FORM_ID','YOURFORMIDHERE','https://formspree.io/f/testform'])assert.equal(configuredFormId(value),'');
  assert.equal(configuredFormId(' abcd1234 '),'abcd1234');
});
test('successful submission posts trimmed fields, shows loading then success, and resets once',async()=>{
  const c=setup();await c.submit(c.event);
  assert.deepEqual(c.states,['loading','success']);assert.equal(c.messages.at(-1),SUCCESS_MESSAGE);assert.equal(c.resets(),1);
  assert.equal(c.calls[0][0],'https://formspree.io/f/testform');assert.equal(c.calls[0][1].method,'POST');assert.equal(c.calls[0][1].headers.Accept,'application/json');
  assert.equal(c.data.get('name'),'Visitor');assert.equal(c.data.get('subject'),'Hello');
});
test('native validation failure makes no request and does not clear fields',async()=>{
  const c=setup({valid:false});await c.submit(c.event);assert.equal(c.calls.length,0);assert.equal(c.resets(),0);assert.deepEqual(c.states,[]);
});
test('whitespace-only required fields are rejected before submission',async()=>{
  const c=setup({values:{subject:'   '}});await c.submit(c.event);assert.equal(c.calls.length,0);assert.ok(c.validationError());assert.equal(c.resets(),0);
});
test('missing configuration directs the visitor to email without a request',async()=>{
  const c=setup({formId:''});await c.submit(c.event);assert.equal(c.calls.length,0);assert.deepEqual(c.states,['error']);assert.match(c.messages.at(-1),/swamychekka7@gmail.com/);assert.equal(c.resets(),0);
});
test('server rejection shows the requested error and preserves fields',async()=>{
  const c=setup({request:async()=>({ok:false})});await c.submit(c.event);assert.deepEqual(c.states,['loading','error']);assert.equal(c.messages.at(-1),ERROR_MESSAGE);assert.equal(c.resets(),0);
});
test('network failure preserves fields and allows a later retry',async()=>{
  let attempt=0;const c=setup({request:async()=>{if(++attempt===1)throw new Error('offline');return {ok:true}}});
  await c.submit(c.event);assert.equal(c.messages.at(-1),ERROR_MESSAGE);assert.equal(c.resets(),0);
  await c.submit(c.event);assert.deepEqual(c.states,['loading','error','loading','success']);assert.equal(c.resets(),1);
});
test('duplicate submissions are blocked while a request is in flight',async()=>{
  let finish;const c=setup({request:()=>new Promise(resolve=>{finish=resolve})});
  const first=c.submit(c.event);await c.submit(c.event);assert.equal(c.calls.length,1);assert.deepEqual(c.states,['loading']);
  finish({ok:true});await first;assert.equal(c.resets(),1);assert.deepEqual(c.states,['loading','success']);
});
