const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

async function postJSON(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const type = response.headers.get('content-type') || '';
  if (!response.ok) {
    throw new Error(`request-failed:${response.status}`);
  }
  if (!type.includes('application/json')) {
    throw new Error('invalid-response');
  }

  return response.json().catch(() => ({}));
}

export async function submitContactMessage(payload) {
  if (!CONTACT_ENDPOINT) {
    throw new Error('contact-not-configured');
  }
  return postJSON(CONTACT_ENDPOINT, payload);
}

export async function subscribeToNewsletter(email) {
  if (!NEWSLETTER_ENDPOINT) {
    throw new Error('newsletter-not-configured');
  }
  return postJSON(NEWSLETTER_ENDPOINT, { email });
}
