// api/gemini.test.js
import fetch from 'node-fetch';

// Detect environment: use Vercel URL if running on Vercel or in production, else use localhost
const BASE_URL = (process.env.VERCEL || process.env.NODE_ENV === 'production')
  ? 'https://templatehomepage-krd3amfvl-planet-09-ais-projects.vercel.app/api/gemini'
  : 'http://localhost:5175/api/gemini';

async function testGeminiAPI() {
  const messages = [
    { role: 'system', content: 'You are an expert assistant. Only answer from the following data.' },
    { role: 'user', content: 'what projects have i done' }
  ];
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  if (!res.ok) {
    console.error('Test failed: HTTP', res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  if (!data.reply) {
    console.error('Test failed: No reply in response', data);
    process.exit(1);
  }
  console.log('Test passed! Gemini API reply:', data.reply);
}

testGeminiAPI();
