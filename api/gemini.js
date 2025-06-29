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

// Detect environment: use alternate Gemini API base URL if provided, else use default
const GEMINI_API_BASE_URL = process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';

router.post('/gemini', async (req, res) => {
  try {
    const { messages } = req.body;
    const model = req.query.model || DEFAULT_MODEL;
    // Compose the prompt: system prompt (repo list) + user message
    const systemPrompt = messages.find(m => m.role === 'system')?.content || '';
    const userMessage = messages.filter(m => m.role === 'user').map(m => m.content).join('\n');
    const prompt = `${systemPrompt}\n\n${userMessage}`;
    // Use environment-based Gemini API base URL
    const url = `${GEMINI_API_BASE_URL}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    const apiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await apiRes.json();
    if (!apiRes.ok) {
      return res.status(200).json({ error: data.error?.message || 'Gemini API error', status: apiRes.status });
    }
    // Try to extract the reply text
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || data.candidates?.[0]?.content?.text || '';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(200).json({ error: err.message || err });
  }
});

export default router;
