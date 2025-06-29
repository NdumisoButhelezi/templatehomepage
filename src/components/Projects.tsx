import React, { useEffect, useRef, useState } from "react";
import { fetchAndBuildGeminiPrompt } from '../utils/geminiPrompt';

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

// Add a summarization instruction to the system prompt
const summarizationInstruction = "When answering, use your summarization capabilities to provide concise, clear, and relevant responses based only on the provided repository data.";

// Full repo list for Gemini prompt
const initialGeminiPrompt = `You are an expert assistant. Only answer questions using the following GitHub repositories and their metadata. Do not use outside knowledge. If the answer is not present, say \"I don't know based on the provided repositories.\"\n\n${summarizationInstruction}

Repository Data:
1. MarkChamane: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/MarkChamane
2. templatehomepage: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 1. URL: https://github.com/NdumisoButhelezi/templatehomepage
3. Charlene-Makwara-Planet09-Portfolio: No description. Language: N/A. Topics: None. Stars: 1. Forks: 0. URL: https://github.com/NdumisoButhelezi/Charlene-Makwara-Planet09-Portfolio
4. BestReg: This is a working register and login created for MVC projects that are built using ASP.NET MVC Version .NET 8  . Language: C#. Topics: None. Stars: 1. Forks: 7. URL: https://github.com/NdumisoButhelezi/BestReg
5. projectIGOVU: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/projectIGOVU
6. Godot-Poker-Machine-Learning: Godot Poker Machine Learning Project is a game that combines poker with machine learning. It uses Python-based AI to predict optimal moves, all within the Godot game engine.. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Godot-Poker-Machine-Learning
7. Dodge-corona: A game to dodge incoming virus on godot engine. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Dodge-corona
8. the-coronavirus-war: ☣️ A 2D platformer game developed in Godot where scientists battle against COVID-19 viruses across multiple levels.. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/the-coronavirus-war
9. thembi: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/thembi
10. skill-up-connect-hub: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/skill-up-connect-hub
11. Booking: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Booking
12. BudgetHotel: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/BudgetHotel
13. HubProject: No description. Language: C#. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/HubProject
14. MultimodalGeminiAPP: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/MultimodalGeminiAPP
15. HexSoftwares_Banking_System: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/HexSoftwares_Banking_System
16. GeminiConsole: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/GeminiConsole
17. 00-Login: No description. Language: Jupyter Notebook. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/00-Login
18. GEMINI25: This will eventually be a chatbot. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/GEMINI25
19. AAPlayground: mmm. Language: JavaScript. Topics: None. Stars: 1. Forks: 0. URL: https://github.com/NdumisoButhelezi/AAPlayground
20. Car-racing-gesture-control-python-game: its car racing game with hand gesture recognition  using opencv ,pygame . Language: N/A. Topics: None. Stars: 1. Forks: 1. URL: https://github.com/NdumisoButhelezi/Car-racing-gesture-control-python-game
21. EduTech: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 6. URL: https://github.com/NdumisoButhelezi/EduTech
22. CampusSafety: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/CampusSafety
23. Mental-Health: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 4. URL: https://github.com/NdumisoButhelezi/Mental-Health
24. FlyingBirds: Created with StackBlitz ⚡️. Language: TypeScript. Topics: None. Stars: 1. Forks: 0. URL: https://github.com/NdumisoButhelezi/FlyingBirds
25. Clubs_Society: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Clubs_Society
26. ImageAPI: No description. Language: HTML. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/ImageAPI
27. nokwazi: Created with StackBlitz ⚡️. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/nokwazi
28. pupil: Open source eye tracking . Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/pupil
29. WebApplication4: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/WebApplication4
30. TyronGraphicProject: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/TyronGraphicProject
31. ToDoList: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/ToDoList
32. NdumisoButhelezi: Config files for my GitHub profile.. Language: C#. Topics: config, github-config. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/NdumisoButhelezi
33. MouseMoverBot: The Mouse Mover is a Python script that moves the mouse cursor randomly on the screen at regular intervals. It can be used to prevent the computer from going into sleep mode or to simulate user activity.. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/MouseMoverBot
34. DeepSeek-V3: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/DeepSeek-V3
35. BestRegi: No description. Language: C#. Topics: None. Stars: 0. Forks: 1. URL: https://github.com/NdumisoButhelezi/BestRegi
36. OpenAiChatbot-ChatGPT: Create your own Open AI Chatbot in C# by consuming Open AI API. Language: C#. Topics: None. Stars: 1. Forks: 0. URL: https://github.com/NdumisoButhelezi/OpenAiChatbot-ChatGPT
37. bolt.diy: Prompt, run, edit, and deploy full-stack web applications using any LLM you want!. Language: N/A. Topics: None. Stars: 1. Forks: 0. URL: https://github.com/NdumisoButhelezi/bolt.diy
38. generative-ai: Sample code and notebooks for Generative AI on Google Cloud, with Gemini on Vertex AI. Language: N/A. Topics: None. Stars: 1. Forks: 0. URL: https://github.com/NdumisoButhelezi/generative-ai
39. home_affairs_booking_system: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/home_affairs_booking_system
40. project1001: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/project1001
41. project1003: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/project1003
42. project103: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/project103
43. PropLit: Created with StackBlitz ⚡️. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/PropLit
44. ai-chatbot: AI Chatbot with Streamlit, Langchain, and Mistral7b. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/ai-chatbot
45. models: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/models
46. NEWLMS: No description. Language: HTML. Topics: None. Stars: 0. Forks: 1. URL: https://github.com/NdumisoButhelezi/NEWLMS
47. LMS_Flask: No description. Language: Python. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/LMS_Flask
48. flask-hello-world: No description. Language: Python. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/flask-hello-world
49. GeoVenturer: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/GeoVenturer
50. shePower: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 1. URL: https://github.com/NdumisoButhelezi/shePower
51. label-studio: Label Studio is a multi-type data labeling and annotation tool with standardized output format. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/label-studio
52. gemini_chatbot_javascript: A Javascript Chatbot built with the Gemini AI. Language: HTML. Topics: None. Stars: 0. Forks: 2. URL: https://github.com/NdumisoButhelezi/gemini_chatbot_javascript
53. node-charts-app: No description. Language: HTML. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/node-charts-app
54. Contextual-Shopping-Advisor: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Contextual-Shopping-Advisor
55. Logikos: No description. Language: HTML. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Logikos
56. LogCoins: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/LogCoins
57. BikeShop-main: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/BikeShop-main
58. LogKosT20: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/LogKosT20
59. Android_HCE_Beginner_App: The app includes a Host-Based Card Emulated (HCE) NFC tag and the associated NFC reader. You learn how to setup your own HCE application and how you can communicate with the HCE tag. A tutorial is available on medium.com for more informations.. Language: N/A. Topics: None. Stars: 0. Forks: 1. URL: https://github.com/NdumisoButhelezi/Android_HCE_Beginner_App
60. HomeAffairsMobiApp2: App i created For Mobile Computing 201 in 2024. Language: N/A. Topics: None. Stars: 0. Forks: 1. URL: https://github.com/NdumisoButhelezi/HomeAffairsMobiApp2
61. HomeAffairsMobiApp: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/HomeAffairsMobiApp
62. BestReg-Scans-: This one will seek to experiment of firebase and Azure SQL as databases. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/BestReg-Scans-
63. Firebase_Calender: We are making a booking system functionality for a firebase booking systems. Language: Java. Topics: None. Stars: 1. Forks: 0. URL: https://github.com/NdumisoButhelezi/Firebase_Calender
64. SafeChildren: p. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/SafeChildren
65. OpenGL-Project-1: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/OpenGL-Project-1
66. ecom: No description. Language: C#. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/ecom
67. Sbahle-Events: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Sbahle-Events
68. TextOnlyGeminiAPP: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/TextOnlyGeminiAPP
69. Chatbot-using-API: JavaScript Chatbot with OpenAI API. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Chatbot-using-API
70. DUT-RES-LEAGUE: No description. Language: JavaScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/DUT-RES-LEAGUE
71. claude-engineer: Claude Engineer is an interactive command-line interface (CLI) that leverages the power of Anthropic's Claude-3.5-Sonnet model to assist with software development tasks. This tool combines the capabilities of a large language model with practical file system operations and web search functionality.. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/claude-engineer
72. Vehicle-Tracking-System: This project implements a vehicle tracking system in Java. It tracks the location of a vehicle using GPS coordinates and provides information such as the current location, total distance travelled, and danger zone status.. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Vehicle-Tracking-System
73. indaba-pracs-2022: Notebooks for the Practicals at the Deep Learning Indaba 2022.. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/indaba-pracs-2022
74. LLMs-from-scratch: Implementing a ChatGPT-like LLM in PyTorch from scratch, step by step. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/LLMs-from-scratch
75. SignUP-SignIn-Form-with-connection-to-FIrebase: Source code for login and signup form with connection to firebase authentication and firestore. Language: JavaScript. Topics: None. Stars: 0. Forks: 2. URL: https://github.com/NdumisoButhelezi/SignUP-SignIn-Form-with-connection-to-FIrebase
76. PDFMASTER04: LOGIN APP. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/PDFMASTER04
77. popp: oiu. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/popp
78. OpenPDF: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/OpenPDF
79. WEJSAPP: GHG. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/WEJSAPP
80. dalle-image-generation: Tool built with GPTScript in mind to generate images. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/dalle-image-generation
81. DoCamp: rag on mobile a step closer . Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/DoCamp
82. face_recognition_teegee: This repository contains a facial recognition project implemented using Python, OpenCV, and the face_recognition library. The primary goal of this project is to recognize specific individuals from a set of images and to identify unrecognized faces in real-time using a webcam.. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/face_recognition_teegee
83. appointment-scheduler-codelab: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/appointment-scheduler-codelab
84. ChemistryAttandance: Attandence for varsity kids. Language: Java. Topics: None. Stars: 0. Forks: 3. URL: https://github.com/NdumisoButhelezi/ChemistryAttandance
85. ChemAttend: No description. Language: Java. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/ChemAttend
86. RAGAppTutor: NEW GEMINI LAYOUT. Language: Java. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/RAGAppTutor
87. SmsApp01: Notifications messegase for admin. Language: Java. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/SmsApp01
88. LastAppointment: this is the final firebase patient adminactivity . Language: Java. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/LastAppointment
89. Appointments-Admin: No description. Language: Java. Topics: None. Stars: 0. Forks: 1. URL: https://github.com/NdumisoButhelezi/Appointments-Admin
90. Appointments-Admin-Two-User: hgjyfj. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Appointments-Admin-Two-User
91. MultiTurnConversationsGeminiAPP: Chatbot with Gemini. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/MultiTurnConversationsGeminiAPP
92. with-tailwindcss-app: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/with-tailwindcss-app
93. nextjs-dashboard: No description. Language: TypeScript. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/nextjs-dashboard
94. New-folderF11: No description. Language: Python. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/New-folderF11
95. GOOGLE-API: No description. Language: N/A. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/GOOGLE-API
96. Fantastic-11: We are building a website that will help . Language: Python. Topics: None. Stars: 0. Forks: 0. URL: https://github.com/NdumisoButhelezi/Fantastic-11
`;

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
          <div className="flex justify-center items-center min-h-[100px]" role="status" aria-live="polite">
            <svg className="animate-spin h-8 w-8 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading spinner">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-400" role="alert">{error}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredRepos.map(repo => (
              <div key={repo.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" tabIndex={0} aria-label={`Project: ${repo.name}`}>
                <div className="flex items-center mb-2">
                  <img src={repo.owner.avatar_url} alt="Owner avatar" className="w-8 h-8 rounded-full mr-2" loading="lazy" />
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
        <ChatbotWidget />
      </div>
    </section>
  );
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'system', content: initialGeminiPrompt },
    { role: 'user', content: 'what projects have i done' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, open]);

  async function callGeminiAPI(messages: { role: string; content: string }[]) {
    // Try primary model first
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      if (!res.ok) throw new Error('Primary Gemini model failed: ' + (await res.text()));
      const data = await res.json();
      if (data.reply) return data.reply;
      throw new Error('No response from primary Gemini model.');
    } catch (err) {
      // Try fallback model (Gemini 2.5 Flash)
      try {
        const fallbackRes = await fetch('/api/gemini?model=gemini-2.5-flash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages })
        });
        if (!fallbackRes.ok) throw new Error('Fallback Gemini model failed: ' + (await fallbackRes.text()));
        const fallbackData = await fallbackRes.json();
        if (fallbackData.reply) return fallbackData.reply;
        throw new Error('No response from fallback Gemini model.');
      } catch (fallbackErr) {
        return `Error: ${
          typeof fallbackErr === 'object' && fallbackErr !== null && 'message' in fallbackErr
            ? (fallbackErr as { message: string }).message
            : String(fallbackErr)
        }`;
      }
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatLoading(true);
    const newHistory = [...chatHistory, { role: 'user', content: chatInput }];
    setChatHistory(newHistory);
    const reply = await callGeminiAPI(newHistory);
    setChatHistory([...newHistory, { role: 'assistant', content: reply }]);
    setChatInput("");
    setChatLoading(false);
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 z-50 bg-amber-400 hover:bg-amber-500 text-black font-bold p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? (
          <span className="text-2xl">×</span>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 22c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
            <path d="M15 9h.01M9 9h.01M8 13c.667 1 2.333 1 3 0" />
          </svg>
        )}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh]">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-amber-400 rounded-t-xl flex items-center justify-between">
            <span className="font-bold text-black">Ask Gemini</span>
            <button onClick={() => setOpen(false)} className="text-black text-xl font-bold">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900" style={{ minHeight: 200 }}>
            {chatHistory.filter(m => m.role !== 'system').map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-amber-400 text-black' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>
                  <b>{msg.role === 'user' ? 'You' : 'Gemini'}:</b> {msg.content}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleChatSubmit} className="flex gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask about your projects..."
              className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              disabled={chatLoading}
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded-md transition-all disabled:opacity-60"
            >
              {chatLoading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Projects;
