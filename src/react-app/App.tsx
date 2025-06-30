// src/App.tsx

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";

interface GeneratedImage {
  url: string;
  mimeType: string;
}

interface ApiResponse {
  success: boolean;
  prompt: string;
  model?: string;
  models?: { modelA: string; modelB: string };
  images: GeneratedImage[];
  error?: string;
  timestamp: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("unknown");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("flux-pro-1.1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string>("");
  const [models, setModels] = useState<Array<{ name: string, id: string }>>([]);

  // Load available models
  const loadModels = async () => {
    try {
      const response = await fetch("/api/models");
      const data = await response.json();
      setModels(data.models || []);
    } catch (err) {
      console.error("Failed to load models:", err);
    }
  };

  // Generate single image
  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGeneratedImages([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          model: selectedModel,
        }),
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.images.length > 0) {
        setGeneratedImages(data.images);
      } else {
        setError(data.error || "Failed to generate image");
      }
    } catch (err) {
      setError("Network error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsGenerating(false);
    }
  };

  // Compare two models
  const compareModels = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGeneratedImages([]);

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          modelA: "flux-pro-1.1",
          modelB: "flux-dev",
        }),
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.images.length > 0) {
        setGeneratedImages(data.images);
      } else {
        setError(data.error || "Failed to generate images");
      }
    } catch (err) {
      setError("Network error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsGenerating(false);
    }
  };

  // Load models on component mount
  useEffect(() => {
    loadModels();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://hono.dev/" target="_blank">
          <img src={honoLogo} className="logo cloudflare" alt="Hono logo" />
        </a>
        <a href="https://workers.cloudflare.com/" target="_blank">
          <img
            src={cloudflareLogo}
            className="logo cloudflare"
            alt="Cloudflare logo"
          />
        </a>
      </div>

      <h1>AI Image Generator</h1>
      <p className="subtitle">Powered by Vite + React + Hono + Cloudflare Workers</p>

      {/* Original counter for testing */}
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          aria-label="increment"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {/* API test */}
      <div className="card">
        <button
          onClick={() => {
            fetch("/api/")
              .then((res) => res.json() as Promise<{ name: string }>)
              .then((data) => setName(data.name));
          }}
          aria-label="get name"
        >
          API Status: {name}
        </button>
        <p>
          <a href="/api/docs" target="_blank">📖 View API Documentation</a>
        </p>
      </div>

      {/* Image Generation Interface */}
      <div className="image-generator">
        <h2>🎨 Generate AI Images</h2>

        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={3}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "2px solid #646cff",
              backgroundColor: "#1a1a1a",
              color: "white",
              resize: "vertical",
              marginBottom: "16px"
            }}
          />
        </div>

        <div className="model-selection" style={{ marginBottom: "16px" }}>
          <label style={{ marginRight: "12px" }}>Model:</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "2px solid #646cff",
              backgroundColor: "#1a1a1a",
              color: "white"
            }}
          >
            {models.length > 0 ? (
              models.map((model) => (
                <option key={model.id} value={model.name}>
                  {model.name}
                </option>
              ))
            ) : (
              <>
                <option value="flux-pro-1.1">Flux Pro 1.1</option>
                <option value="flux-dev">Flux Dev</option>
              </>
            )}
          </select>
        </div>

        <div className="action-buttons" style={{ marginBottom: "24px" }}>
          <button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              marginRight: "12px",
              backgroundColor: "#646cff",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: isGenerating ? "not-allowed" : "pointer",
              opacity: isGenerating || !prompt.trim() ? 0.6 : 1
            }}
          >
            {isGenerating ? "⏳ Generating..." : "🎨 Generate Image"}
          </button>

          <button
            onClick={compareModels}
            disabled={isGenerating || !prompt.trim()}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#42b883",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: isGenerating ? "not-allowed" : "pointer",
              opacity: isGenerating || !prompt.trim() ? 0.6 : 1
            }}
          >
            {isGenerating ? "⏳ Comparing..." : "🔄 Compare Models"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            padding: "12px",
            backgroundColor: "#ff4444",
            color: "white",
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            ❌ {error}
          </div>
        )}

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div className="generated-images">
            <h3>✨ Generated Images</h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
              marginTop: "16px"
            }}>
              {generatedImages.map((image, index) => (
                <div key={index} style={{
                  border: "2px solid #646cff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#1a1a1a"
                }}>
                  <img
                    src={image.url}
                    alt={`Generated image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block"
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling!.textContent = "❌ Failed to load image";
                    }}
                  />
                  <div style={{ padding: "12px" }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>
                      {image.mimeType} • Image {index + 1}
                    </p>
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#646cff",
                        textDecoration: "none",
                        fontSize: "14px"
                      }}
                    >
                      🔗 Open full size
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Prompts */}
        <div className="sample-prompts" style={{ marginTop: "32px" }}>
          <h3>💡 Try these sample prompts:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              "A majestic dragon flying over a medieval castle",
              "A futuristic cyberpunk cityscape at night",
              "A peaceful zen garden with cherry blossoms",
              "An astronaut riding a horse on Mars",
              "A steampunk airship floating above clouds"
            ].map((samplePrompt, index) => (
              <button
                key={index}
                onClick={() => setPrompt(samplePrompt)}
                style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  backgroundColor: "#2a2a2a",
                  border: "1px solid #646cff",
                  borderRadius: "6px",
                  color: "#646cff",
                  cursor: "pointer"
                }}
              >
                {samplePrompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the logos to learn more about the stack
      </p>
    </>
  );
}

export default App;
