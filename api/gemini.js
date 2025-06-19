// Simple Gemini API proxy for Vite/Node.js
// Place this in your project root as api/gemini.js

import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyC5vNkD1HGV-V7Yu_m4J76skFkChvXKr4s';
const DEFAULT_MODEL = 'gemma-3n-e4b-it';
const FALLBACK_MODEL = 'gemini-2.5-flash';

// Shorter initial system prompt for Gemini
const shortSystemPrompt = `You are an expert assistant. Only answer questions using the following GitHub repositories and their metadata. Do not use outside knowledge. If the answer is not present, say "I don't know based on the provided repositories."`;

router.post('/gemini', async (req, res) => {
  try {
    const { messages } = req.body;
    const model = req.query.model || DEFAULT_MODEL;
    // Use short system prompt + user message
    const userMessage = messages.filter(m => m.role === 'user').map(m => m.content).join('\n');
    const repoList = messages.find(m => m.role === 'system')?.content?.replace(/^[\s\S]*?Repository Data:/, 'Repository Data:') || '';
    const prompt = `${shortSystemPrompt}\n\n${repoList}\n\n${userMessage}`;
    // Use GoogleGenAI REST API format
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
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
    console.error('Gemini API error:', err);
    return res.status(200).json({ error: err.message || err });
  }
});

export default router;
