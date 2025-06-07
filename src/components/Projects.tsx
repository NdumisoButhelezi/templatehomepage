import React, { useEffect, useState } from "react";

// Define the type for a GitHub repository
type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  owner: { avatar_url: string };
};

const GITHUB_USERNAME = "NdumisoButhelezi";

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: { Accept: "application/vnd.github.mercy-preview+json" }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load projects. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">My GitHub Projects</h2>
        <input
          type="text"
          placeholder="Filter projects..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="block mx-auto mb-8 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          aria-label="Filter projects"
        />
        {loading ? (
          <div className="flex justify-center items-center min-h-[100px]">
            <svg className="animate-spin h-8 w-8 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading spinner">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-400">{error}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredRepos.map(repo => (
              <div key={repo.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" tabIndex={0} aria-label={`Project: ${repo.name}`}>
                <div className="flex items-center mb-2">
                  <img src={repo.owner.avatar_url} alt="Owner avatar" className="w-8 h-8 rounded-full mr-2" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {repo.name}
                    </a>
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{repo.description || "No description"}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {repo.topics && repo.topics.map(topic => (
                    <span key={topic} className="bg-gray-200 dark:bg-gray-600 text-xs px-2 py-1 rounded text-gray-800 dark:text-gray-200">{topic}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  {repo.language && (
                    <span className="inline-block bg-amber-400 text-black px-2 py-1 rounded text-xs font-semibold">{repo.language}</span>
                  )}
                  <span title="Stars" aria-label="Stars">⭐ {repo.stargazers_count}</span>
                  <span title="Forks" aria-label="Forks">🍴 {repo.forks_count}</span>
                </div>
              </div>
            ))}
            {filteredRepos.length === 0 && (
              <div className="col-span-3 text-center text-gray-600 dark:text-gray-300">No projects found.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
