export const SUCCESS_MESSAGE = "Thank you for reaching out! Your message has been sent successfully. I'll get back to you as soon as possible.";
export const ERROR_MESSAGE = 'Sorry, your message could not be sent. Please try again or contact me by email.';

export function configuredFormId(value) {
  const id = value?.trim() || '';
  return /^[a-z0-9]+$/i.test(id) && !/^yourformid(here)?$/i.test(id) ? id : '';
}

export function createContactSubmission({formId, onStatus, onMessage, request = (...args) => fetch(...args), createData = form => new FormData(form)}) {
  let inFlight = false;
  return async function submit(event) {
    event.preventDefault();
    if (inFlight) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = createData(form);
    for (const name of ['name', 'email', 'subject', 'message']) {
      const value = String(data.get(name) || '').trim();
      if (!value) {
        const input = form.elements.namedItem(name);
        input.setCustomValidity('Please enter a value, not only spaces.');
        form.reportValidity();
        return;
      }
      data.set(name, value);
    }
    if (!configuredFormId(formId)) {
      onStatus('error');
      onMessage('The contact form is not connected yet. Please email swamychekka7@gmail.com directly.');
      return;
    }
    inFlight = true;
    onStatus('loading');
    onMessage('');
    try {
      const response = await request(`https://formspree.io/f/${encodeURIComponent(formId.trim())}`, {
        method: 'POST', body: data, headers: {Accept: 'application/json'},
      });
      if (!response.ok) throw new Error('Formspree rejected the submission');
      form.reset();
      onStatus('success');
      onMessage(SUCCESS_MESSAGE);
    } catch {
      onStatus('error');
      onMessage(ERROR_MESSAGE);
    } finally {
      inFlight = false;
    }
  };
}
