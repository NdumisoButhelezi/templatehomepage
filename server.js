import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import geminiRoute from './api/gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5175;

app.use(express.json());
app.use('/api', geminiRoute);

// Optional: Serve static files from Vite build (uncomment for production)
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
