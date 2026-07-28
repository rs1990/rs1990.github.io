// Cloudflare Worker: proxy for the portfolio chatbot.
// Holds ANTHROPIC_API_KEY as a secret; only accepts requests from the portfolio origins.

const ALLOWED_ORIGINS = [
  'https://raghavendrasriram.com',
  'https://www.raghavendrasriram.com',
  'https://rs1990.github.io',
];

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response('Forbidden', { status: 403 });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(origin) });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Bad request', { status: 400, headers: corsHeaders(origin) });
    }

    // Only forward the fields the chatbot needs; cap output tokens server-side.
    const payload = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: Math.min(body.max_tokens || 800, 800),
      system: body.system,
      messages: body.messages,
    };

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    });

    const data = await upstream.text();
    return new Response(data, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  },
};
