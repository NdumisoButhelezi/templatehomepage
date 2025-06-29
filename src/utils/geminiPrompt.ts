// Gemini Prompt Engineering Helper
// This module fetches your GitHub repos and builds a prompt for Gemini to answer questions solely based on your repo data.

export async function fetchAndBuildGeminiPrompt(username: string, question: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
  const repos = await res.json();
  const repoList = repos.map((repo: any, i: number) =>
    `${i + 1}. ${repo.name}: ${repo.description || 'No description'}. Language: ${repo.language || 'N/A'}. Topics: ${(repo.topics || []).join(', ') || 'None'}. Stars: ${repo.stargazers_count}. Forks: ${repo.forks_count}. URL: ${repo.html_url}`
  ).join('\n');

  const prompt = `You are an expert assistant. You must answer questions using ONLY the following list of GitHub repositories and their metadata. Do not use any outside knowledge or make assumptions beyond what is provided. If the answer is not present in the data, say \"I don't know based on the provided repositories.\"\n\nRepository Data:\n${repoList}\n\nQuestion: ${question}`;

  return prompt;
}
