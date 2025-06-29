// Simple Gemini API proxy for Vite/Node.js
// Place this in your project root as api/gemini.js

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = 'gemma-3n-e4b-it';
const FALLBACK_MODEL = 'gemini-2.5-flash';

router.post('/gemini', async (req, res) => {
  try {
    const { messages } = req.body;
    const model = req.query.model || DEFAULT_MODEL;
    // Compose the prompt: system prompt (repo list) + user message
    const systemPrompt = messages.find(m => m.role === 'system')?.content || '';
    const userMessage = messages.filter(m => m.role === 'user').map(m => m.content).join('\n');
    const prompt = `${systemPrompt}\n\n${userMessage}`;
    // Use GoogleGenAI REST API format
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    let apiRes, data;
    try {
      apiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      data = await apiRes.json();
      if (!apiRes.ok) {
        console.error('Gemini API error:', data);
        // Try fallback model
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/${FALLBACK_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
        try {
          const fallbackRes = await fetch(fallbackUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          });
          const fallbackData = await fallbackRes.json();
          if (!fallbackRes.ok) {
            console.error('Fallback Gemini model failed:', fallbackData);
            return res.status(200).json({ error: `Fallback Gemini model failed: ${fallbackData.error?.message || 'Unknown error'}`, details: fallbackData, status: fallbackRes.status });
          }
          const fallbackReply = fallbackData.candidates?.[0]?.content?.parts?.[0]?.text || fallbackData.candidates?.[0]?.content?.text || '';
          return res.status(200).json({ reply: fallbackReply });
        } catch (fallbackErr) {
          console.error('Fallback Gemini model invocation error:', fallbackErr);
          return res.status(200).json({ error: `Fallback Gemini model invocation error: ${fallbackErr.message || fallbackErr}` });
        }
      }
      // Try to extract the reply text
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || data.candidates?.[0]?.content?.text || '';
      return res.status(200).json({ reply });
    } catch (apiErr) {
      console.error('Gemini API invocation error:', apiErr);
      return res.status(200).json({ error: `Gemini API invocation error: ${apiErr.message || apiErr}` });
    }
  } catch (err) {
    console.error('Server error:', err);
    return res.status(200).json({ error: err.message || err });
  }
});

export default router;
