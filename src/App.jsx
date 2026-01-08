import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Github, Linkedin, Mail, Menu, X, Send, Bot, User, ExternalLink, Code, Edit2, Save, XCircle, Plus, Trash2, Award, Briefcase, FileText, Brain, TrendingUp, AlertCircle } from 'lucide-react';

// Initial Portfolio Data
const initialData = {
  about: {
    name: "Sumit Srivastava",
    title: "Senior Full Stack Engineer | .NET Solution Architect | AWS Certified AI Practitioner",
    subtitle: "Building Intelligent Agents with n8n & LLMs",
    location: "Raleigh, North Carolina, United States",
    summary: "Technology Lead and Senior .NET Full Stack Developer with close to 15 years of experience in delivering scalable, enterprise-grade software across healthcare, banking, and financial domains. Expert in ASP.NET Core, Microservices, and modern front-end engineering using Angular and TypeScript.",
    aiExpertise: "In the last 2 years, actively expanding expertise in Agentic AI, Model Context Protocol (MCP), n8n automation workflows, and LLM orchestration using tools such as Claude (Anthropic), OpenAI, and Cursor.",
    expertise: ["ASP.NET Core", "Angular", "Agentic AI", "n8n", "GitHub Copilot", "Cursor AI", "AWS", "RAG Systems"],
    experience: "15 years"
  },
  experience: [
    {
      company: "CGI",
      role: "Senior Consultant",
      period: "Jan 2018 - Present (8 years)",
      location: "Raleigh-Durham, NC",
      achievements: [
        "Architect scalable solutions using C#, ASP.NET Core 3.1, Angular, Web API, and SQL Server",
        "FACETS expertise: Enhanced UI screens for Claims, Payment Jobs, and Member modules",
        "AI/ML Integration: Implemented RAG pipelines with LLMs for intelligent automation",
        "Led production deployments and Agile team coordination"
      ]
    },
    {
      company: "Optum",
      role: "Senior Software Engineer",
      period: "Mar 2014 - Jan 2018 (4 years)",
      location: "Eden Prairie, MN",
      achievements: [
        "Created architecture for complete SDLC using C#, VB.Net, jQuery, and Angular JS",
        "Migrated classic ASP to ASP.NET 4.5, automated SSL renewals with VENAFI",
        "Built WCF middleware and supervised 6 engineers"
      ]
    },
    {
      company: "Tech Mahindra",
      role: "Senior Software Engineer",
      period: "Apr 2010 - Mar 2014 (4 years)",
      location: "Hyderabad, India",
      achievements: [
        "Built dealer management portal from scratch using ASP.NET 3.5 and Oracle 11g",
        "Implemented WCF services and AJAX functionality",
        "Performance tuning and query optimization"
      ]
    }
  ],
  projects: [
    {
      name: "Enterprise RAG & Agentic AI Platform",
      description: "Production-grade RAG system with LLM orchestration using Claude and OpenAI for healthcare workflow automation.",
      tech: ["Python", "Claude", "OpenAI", "RAG", "n8n"],
      impact: "40% faster decision-making"
    },
    {
      name: "MCP Framework",
      description: "Model Context Protocol clients/servers enabling AI agent integration with enterprise systems.",
      tech: ["TypeScript", "MCP", "Cursor AI", "Node.js"],
      impact: "10x faster AI integration"
    },
    {
      name: "Healthcare Claims System",
      description: "ASP.NET Core microservices for claims processing integrated with FACETS.",
      tech: ["ASP.NET Core", "Angular", "SQL Server", "xUnit"],
      impact: "100K+ claims/month, 99.8% accuracy"
    },
    {
      name: "n8n Automation Workflows",
      description: "Sophisticated automation pipelines orchestrating AI agents and cross-system integrations.",
      tech: ["n8n", "GitHub Copilot", "Python", "JavaScript"],
      impact: "150+ hours saved monthly"
    }
  ],
  skills: {
    backend: ["ASP.NET Core", "C#", ".NET Framework", "Microservices", "Web API", "WCF", "Entity Framework"],
    frontend: ["Angular", "TypeScript", "JavaScript", "jQuery", "HTML/CSS"],
    ai: ["Claude", "OpenAI", "n8n", "MCP", "RAG", "GitHub Copilot", "Cursor AI"],
    cloud: ["AWS", "Azure", "IIS"],
    databases: ["SQL Server", "Oracle", "PL/SQL"],
    testing: ["xUnit", "MSTest", "Integration Testing"]
  },
  certifications: [
    "AWS Certified AI Practitioner",
    "IBM RAG and Agentic AI Specialization",
    "SAFe DevOps 4.5",
    "ITIL Foundation",
    "Healthcare Management AHM 250"
  ],
  awards: ["Team Excellence Award (2023)", "Star Award (2022)"],
  education: [
    { degree: "MBA", field: "Information System Management", school: "Sikkim Manipal University" },
    { degree: "BTech", field: "Electronics & Communications", school: "Shankara Institute of Technology" }
  ],
  contact: {
    email: "sumitsri051@gmail.com",
    github: "https://github.com/SumitCodesAI",
    linkedin: "https://www.linkedin.com/in/sumitsri051",
    medium: "https://medium.com/@sumitsri051"
  }
};

// ML Models Configuration
const ML_MODELS = [
  {
    id: 'housing-price-prediction',
    name: 'Housing Price Predictor',
    description: 'Predict house prices using Linear Regression with 5 features',
    endpoints: {
      health: '/health',
      info: '/model_info',
      predict: '/predict'
    },
    inputFields: [
      { name: 'square_feet', label: 'Square Feet', type: 'number', placeholder: 'e.g., 2000', required: true, min: 500, max: 10000, step: 1 },
      { name: 'num_bedrooms', label: 'Number of Bedrooms', type: 'number', placeholder: 'e.g., 3', required: true, min: 1, max: 10, step: 1 },
      { name: 'num_bathrooms', label: 'Number of Bathrooms', type: 'number', placeholder: 'e.g., 2', required: true, min: 1, max: 10, step: 1 },
      { name: 'year_built', label: 'Year Built', type: 'number', placeholder: 'e.g., 2010', required: true, min: 1900, max: 2026, step: 1 },
      { name: 'distance_to_city', label: 'Distance to City (miles)', type: 'number', placeholder: 'e.g., 5.5', required: true, min: 0, max: 100, step: 0.1 }
    ],
    outputLabel: 'Predicted House Price',
    sampleValues: {
      square_feet: 2000,
      num_bedrooms: 3,
      num_bathrooms: 2,
      year_built: 2010,
      distance_to_city: 5.5
    }
  }
];

// ML Models Testing Panel Component
const MLModelsPanel = ({ isOpen, onClose }) => {
  const [selectedModel] = useState(ML_MODELS[0]);
  const [inputValues, setInputValues] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    if (isOpen && selectedModel) {
      checkHealth();
      fetchModelInfo();
    }
  }, [isOpen, selectedModel]);

  const checkHealth = async () => {
    try {
      const response = await fetch('/api/ml-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: '/health', method: 'GET' })
      });
      const data = await response.json();
      setHealthStatus(data);
    } catch (err) {
      setHealthStatus({ status: 'error', message: `Connection failed: ${err.message}` });
    }
  };

  const fetchModelInfo = async () => {
    try {
      const response = await fetch('/api/ml-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: '/model_info', method: 'GET' })
      });
      const data = await response.json();
      setModelInfo(data);
    } catch (err) {
      console.error('Failed to fetch model info:', err);
      setModelInfo({ error: 'Unable to fetch model info.' });
    }
  };

  const handleInputChange = (fieldName, value) => {
    setInputValues(prev => ({ ...prev, [fieldName]: value }));
    setError(null);
  };

  const handlePredict = async () => {
    const missingFields = selectedModel.inputFields
      .filter(field => field.required && !inputValues[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      setError(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = {};
      selectedModel.inputFields.forEach(field => {
        if (inputValues[field.name] !== undefined && inputValues[field.name] !== '') {
          payload[field.name] = parseFloat(inputValues[field.name]);
        }
      });

      const response = await fetch('/api/ml-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: selectedModel.endpoints.predict,
          method: 'POST',
          body: payload
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message || 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputValues({});
    setPrediction(null);
    setError(null);
  };

  const loadSampleData = () => {
    if (selectedModel.sampleValues) {
      setInputValues(selectedModel.sampleValues);
      setError(null);
      setPrediction(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border-2 border-cyan-400/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex justify-between items-center border-b border-cyan-400/30">
          <div className="flex items-center gap-3">
            <Brain size={32} className="text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Test ML Models</h2>
              <p className="text-cyan-100 text-sm">Interactive Machine Learning Model Testing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition">
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          {/* Model Selection */}
          <div className="mb-6">
            <label className="block text-cyan-400 font-semibold mb-3">Model:</label>
            <div className="p-4 rounded-xl border-2 border-cyan-400 bg-cyan-400/10">
              <div className="flex items-start gap-3">
                <TrendingUp size={24} className="text-cyan-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">{selectedModel.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{selectedModel.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Status */}
          {healthStatus && (
            <div className={`mb-6 p-4 rounded-xl border-2 ${
              healthStatus.status === 'healthy' || healthStatus.status === 'ok'
                ? 'border-green-400/30 bg-green-400/10'
                : 'border-red-400/30 bg-red-400/10'
            }`}>
              <div className="flex items-center gap-2">
                <AlertCircle size={20} className={healthStatus.status === 'healthy' || healthStatus.status === 'ok' ? 'text-green-400' : 'text-red-400'} />
                <span className="font-semibold">
                  Model Status: {healthStatus.status === 'healthy' || healthStatus.status === 'ok' ? '✅ Healthy' : '❌ Unhealthy'}
                </span>
              </div>
            </div>
          )}

          {/* Model Info */}
          {modelInfo && !modelInfo.error && (
            <div className="mb-6 p-4 rounded-xl border-2 border-blue-400/30 bg-blue-400/10">
              <h3 className="font-semibold text-blue-400 mb-2">Model Information:</h3>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                {JSON.stringify(modelInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <Code size={20} /> Input Parameters
              </h3>
              
              <div className="space-y-4">
                {selectedModel.inputFields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm text-slate-300 mb-2">
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type={field.type}
                      value={inputValues[field.name] || ''}
                      onChange={e => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <TrendingUp size={20} /> Predict
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg border-2 border-slate-600 hover:border-slate-500 transition"
                >
                  Reset
                </button>
              </div>

              {selectedModel.sampleValues && (
                <button
                  onClick={loadSampleData}
                  className="w-full mt-3 px-4 py-2 rounded-lg border border-amber-500 text-amber-400 hover:bg-amber-500/10 transition text-sm"
                >
                  📝 Load Sample Data
                </button>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-400 rounded-lg">
                  <p className="text-red-400 text-sm flex items-start gap-2">
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" /> 
                    <span>{error}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <TrendingUp size={20} /> Prediction Result
              </h3>

              {prediction ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border-2 border-cyan-400">
                    <div className="text-center">
                      <p className="text-sm text-slate-300 mb-2">{selectedModel.outputLabel}</p>
                      <p className="text-4xl font-bold text-cyan-400">
                        {typeof prediction === 'object' 
                          ? (prediction.prediction?.price
                              ? `$${parseFloat(prediction.prediction.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                              : prediction.predicted_price 
                                ? `$${parseFloat(prediction.predicted_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : 'N/A')
                          : `$${parseFloat(prediction).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        }
                      </p>
                      {prediction.prediction?.confidence && (
                        <p className="text-xs text-slate-400 mt-2">Confidence (R²): {(prediction.prediction.confidence * 100).toFixed(2)}%</p>
                      )}
                      {prediction.prediction?.model_rmse && (
                        <p className="text-xs text-slate-400">RMSE: ${parseFloat(prediction.prediction.model_rmse).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-sm font-semibold text-slate-400 mb-2">Full Response:</h4>
                    <pre className="text-xs text-slate-300 overflow-x-auto">
                      {JSON.stringify(prediction, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <Brain size={64} className="mb-4 opacity-30" />
                  <p className="text-center">Enter input parameters and click "Predict" to see results</p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 rounded-xl border border-slate-700 bg-slate-800/30">
            <h4 className="font-semibold text-slate-300 mb-2">📋 Instructions:</h4>
            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
              <li>Fill in the required input parameters (marked with *) or use "Load Sample Data"</li>
              <li>Click "Predict" to get the model's prediction</li>
              <li>View the prediction result and full API response</li>
              <li>Click "Reset" to clear inputs and start over</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolio');
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const [editData, setEditData] = useState(data);
  const [editMode, setEditMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mlModelsOpen, setMlModelsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const chatRef = useRef(null);

  // Admin auth state
  const [isAuthed, setIsAuthed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUser, setAdminUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    fetch(`/api/verify?token=${token}`).then(r => r.json()).then(j => {
      if (j && j.ok) setIsAuthed(true);
    }).catch(() => {});
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUser, password: adminPassword })
      });
      const j = await res.json();
      if (j && j.ok && j.token) {
        localStorage.setItem('admin_token', j.token);
        setIsAuthed(true);
        setShowLogin(false);
        setAdminPassword('');
      } else {
        alert('Invalid password');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveEdits = () => {
    setData(editData);
    setEditMode(false);
  };

  const cancelEdits = () => {
    setEditData(data);
    setEditMode(false);
  };

  const updateField = (path, value) => {
    const keys = path.split('.');
    setEditData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addSkill = (category) => {
    const skill = prompt('Enter skill:');
    if (skill) {
      setEditData(prev => ({
        ...prev,
        skills: { ...prev.skills, [category]: [...prev.skills[category], skill] }
      }));
    }
  };

  // Simple RAG
  const searchContent = (query) => {
    const q = query.toLowerCase();
    const results = [];
    
    if (q.includes('experience') || q.includes('work') || q.includes('cgi')) {
      results.push({ source: 'Experience', content: data.experience.map(e => 
        `${e.role} at ${e.company} (${e.period}): ${e.achievements.join('. ')}`
      ).join(' ') });
    }
    if (q.includes('project') || q.includes('built')) {
      results.push({ source: 'Projects', content: data.projects.map(p => 
        `${p.name}: ${p.description} Impact: ${p.impact}`
      ).join(' ') });
    }
    if (q.includes('skill') || q.includes('.net') || q.includes('angular')) {
      results.push({ source: 'Skills', content: 
        `Backend: ${data.skills.backend.join(', ')}. Frontend: ${data.skills.frontend.join(', ')}. AI: ${data.skills.ai.join(', ')}`
      });
    }
    if (q.includes('ai') || q.includes('mcp') || q.includes('rag') || q.includes('n8n')) {
      results.push({ source: 'AI', content: 
        `${data.about.aiExpertise} Projects: ${data.projects.filter(p => p.tech.some(t => ['Claude', 'RAG', 'n8n', 'MCP'].includes(t))).map(p => p.name).join(', ')}`
      });
    }
    if (q.includes('certification') || q.includes('aws')) {
      results.push({ source: 'Certifications', content: data.certifications.join(', ') });
    }
    
    return results;
  };

  const generateResponse = (query, results) => {
    if (!results.length) return { text: "Ask me about Sumit's experience, projects, skills, or AI expertise!", sources: [] };
    
    const q = query.toLowerCase();
    let text = '';
    
    if (q.includes('experience')) {
      text = `Sumit has ${data.about.experience} of experience. Currently Senior Consultant at CGI (2018-Present) working on healthcare solutions with ASP.NET Core and FACETS. Previously at Optum (2014-2018) and Tech Mahindra (2010-2014).`;
    } else if (q.includes('ai') || q.includes('rag') || q.includes('mcp')) {
      text = `Sumit specializes in Agentic AI, MCP, n8n automation, and RAG systems using Claude and OpenAI. He's AWS Certified AI Practitioner and IBM Certified in RAG & Agentic AI. Built enterprise RAG platform (40% faster decisions) and MCP framework (10x faster integration).`;
    } else if (q.includes('project')) {
      text = `Key projects: (1) Enterprise RAG Platform with 40% faster decision-making, (2) MCP Framework with 10x faster AI integration, (3) Healthcare Claims System processing 100K+ claims/month, (4) n8n Automation saving 150+ hours monthly.`;
    } else if (q.includes('skill')) {
      text = `Core skills: ASP.NET Core, C#, Angular, TypeScript. AI: Claude, OpenAI, n8n, MCP, RAG, GitHub Copilot, Cursor AI. Cloud: AWS (certified), Azure. Databases: SQL Server, Oracle. 15 years enterprise experience.`;
    } else {
      text = results[0].content.substring(0, 350);
    }
    
    return { text, sources: results.map(r => r.source) };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setTyping(true);
    
    setTimeout(() => {
      const results = searchContent(input);
      const { text, sources } = generateResponse(input, results);
      setMessages(prev => [...prev, { role: 'assistant', content: text, sources }]);
      setTyping(false);
    }, 1000);
  };

  const current = editMode ? editData : data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Always-visible Admin button (opens login modal) */}
      <button onClick={() => setShowLogin(true)} className="fixed top-4 right-4 z-50 bg-amber-500 text-slate-900 px-3 py-1 rounded-md shadow-md hover:opacity-90">
        Admin
      </button>
      {/* Edit Toolbar */}
      {editMode && (
        <div className="fixed top-0 w-full bg-gradient-to-r from-amber-500 to-orange-500 py-3 px-4 z-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Edit2 size={20} />
            <span className="font-semibold">Edit Mode</span>
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdits} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
              <Save size={18} /> Save
            </button>
            <button onClick={cancelEdits} className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
              <XCircle size={18} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed ${editMode ? 'top-14' : 'top-0'} w-full bg-slate-900/95 backdrop-blur-lg z-40 border-b border-slate-700`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {current.about.name}
            </div>
            <div className="hidden md:flex gap-6">
              {['Projects', 'Experience', 'Skills', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition">{item}</a>
              ))}
              <button onClick={() => setMlModelsOpen(true)} className="hover:text-cyan-400 transition">
                Test ML Models
              </button>
              <button onClick={() => { if (isAuthed) setEditMode(!editMode); else setShowLogin(true); }} className="flex items-center gap-2 text-amber-400">
                <Edit2 size={18} /> {isAuthed ? 'Edit' : 'Admin'}
              </button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      {/* Admin login modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-lg w-96 border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Admin Login</h3>
            <div className="mb-3">
              <label className="text-sm text-slate-300 mb-1 block">Username</label>
              <input
                type="text"
                value={adminUser}
                onChange={e => setAdminUser(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
                placeholder="Admin username"
              />
            </div>
            <input
              type="password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 mb-4"
              placeholder="Enter admin password"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowLogin(false)} className="px-4 py-2 bg-slate-700 rounded">Cancel</button>
              <button onClick={handleLogin} className="px-4 py-2 bg-cyan-600 rounded text-white">Login</button>
            </div>
          </div>
        </div>
      )}
      <section className={`${editMode ? 'pt-44' : 'pt-32'} pb-20 px-4`}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {editMode ? (
              <input value={editData.about.name} onChange={e => updateField('about.name', e.target.value)}
                className="bg-slate-800 border-2 border-cyan-400 rounded px-4 py-2 w-full max-w-2xl" />
            ) : (
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {current.about.name}
              </span>
            )}
          </h1>
          
          <p className="text-xl text-slate-300 mb-2">{current.about.title}</p>
          <p className="text-cyan-400 mb-2">{current.about.subtitle}</p>
          <p className="text-sm text-slate-400 mb-6">📍 {current.about.location}</p>
          
          <div className="max-w-4xl mx-auto text-lg text-slate-300 mb-4">
            {editMode ? (
              <textarea value={editData.about.summary} onChange={e => updateField('about.summary', e.target.value)}
                className="bg-slate-800 border-2 border-cyan-400 rounded px-4 py-3 w-full h-32" />
            ) : (
              <p>{current.about.summary}</p>
            )}
          </div>
          
          <div className="max-w-4xl mx-auto text-lg text-cyan-100 mb-8">
            <p>{current.about.aiExpertise}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#contact" className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-lg font-semibold hover:shadow-lg">
              <Mail size={20} /> Contact
            </a>
            <button onClick={() => setChatOpen(true)} className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600 hover:border-cyan-400">
              <MessageSquare size={20} /> Chat with AI
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {current.about.expertise.map((skill, i) => (
              <div key={i} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="text-cyan-400 font-semibold text-sm">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {current.projects.map((project, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 transition">
                <div className="flex items-start justify-between mb-4">
                  <Code className="text-cyan-400" size={32} />
                  <ExternalLink className="text-slate-500 hover:text-cyan-400" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="text-xs bg-slate-700 px-3 py-1 rounded-full text-cyan-400">{tech}</span>
                  ))}
                </div>
                <div className="text-sm text-emerald-400 font-semibold">📊 {project.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-6">
            {current.experience.map((exp, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                    <p className="text-xl text-slate-300">{exp.company}</p>
                    <p className="text-sm text-slate-400">{exp.location}</p>
                  </div>
                  <span className="text-slate-400">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-cyan-400 mt-1">▹</span>
                      <span className="text-slate-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(current.skills).map(([category, skills]) => (
              <div key={category} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-cyan-400 mb-4 capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="bg-slate-700 px-3 py-1 rounded-full text-sm text-slate-200">
                      {skill}
                      {editMode && (
                        <button onClick={() => {/* remove skill */}} className="ml-2 text-red-400">×</button>
                      )}
                    </span>
                  ))}
                  {editMode && (
                    <button onClick={() => addSkill(category)} className="bg-cyan-600 px-3 py-1 rounded-full text-sm hover:bg-cyan-700">
                      + Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-12 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Award size={24} /> Certifications & Awards
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Certifications:</h4>
                <ul className="space-y-1">
                  {current.certifications.map((cert, i) => (
                    <li key={i} className="text-slate-300 text-sm">✓ {cert}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Awards:</h4>
                <ul className="space-y-1">
                  {current.awards.map((award, i) => (
                    <li key={i} className="text-slate-300 text-sm">🏆 {award}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-xl text-slate-300 mb-8">
            Open to discussing AI consulting, full-time opportunities, or collaboration on innovative projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${current.contact.email}`} className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg hover:bg-slate-700">
              <Mail size={20} /> Email
            </a>
            <a href={current.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg hover:bg-slate-700">
              <Github size={20} /> GitHub
            </a>
            <a href={current.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg hover:bg-slate-700">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href={current.contact.medium} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-lg hover:bg-slate-700">
              <FileText size={20} /> Medium
            </a>
          </div>
        </div>
      </section>

      {/* AI Chat */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 flex flex-col z-50">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <span className="font-bold">Portfolio AI</span>
            </div>
            <button onClick={() => setChatOpen(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-400 mt-8">
                <Bot size={48} className="mx-auto mb-4 text-cyan-400" />
                <p className="mb-2">Ask about:</p>
                <div className="text-sm space-y-1">
                  <p>• Experience & projects</p>
                  <p>• AI/ML expertise</p>
                  <p>• Technical skills</p>
                </div>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && <Bot size={20} className="text-cyan-400 mt-1" />}
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800 border border-slate-700'}`}>
                  <p className="text-sm">{msg.content}</p>
                  {msg.sources && (
                    <div className="mt-2 pt-2 border-t border-slate-600 text-xs text-slate-400">
                      Sources: {msg.sources.join(', ')}
                    </div>
                  )}
                </div>
                {msg.role === 'user' && <User size={20} className="text-blue-400 mt-1" />}
              </div>
            ))}
            
            {typing && (
              <div className="flex gap-2">
                <Bot size={20} className="text-cyan-400 mt-1" />
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((delay, i) => (
                      <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: `${delay}ms`}} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatRef} />
          </div>

          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about experience, skills..."
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
              />
              <button onClick={handleSend} className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg hover:shadow-lg">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 z-40">
          <MessageSquare size={28} />
        </button>
      )}

      {/* ML Models Testing Panel */}
      <MLModelsPanel isOpen={mlModelsOpen} onClose={() => setMlModelsOpen(false)} />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>© 2024 {current.about.name}. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;