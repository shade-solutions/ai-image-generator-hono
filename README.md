# AI Image Generator API

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/vite-react-template)

A powerful AI image generation API built with React + Vite + Hono + Cloudflare Workers, providing comprehensive endpoints for generating AI images using various models through LM Arena integration.

![AI Image Generator](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/fc7b4b62-442b-4769-641b-ad4422d74300/public)

## 🎨 Features

- **Multiple AI Models**: Support for Flux Pro 1.1, Flux Dev, and more
- **Single Image Generation**: Generate images with custom prompts
- **Model Comparison**: Compare outputs from different AI models side-by-side
- **Batch Processing**: Generate multiple images with different prompts
- **Modern UI**: Beautiful React interface with real-time image display
- **RESTful API**: Comprehensive API endpoints with full documentation
- **Edge Computing**: Deployed on Cloudflare Workers for global performance

## 🚀 Tech Stack

- [**React**](https://react.dev/) - Modern UI library with TypeScript
- [**Vite**](https://vite.dev/) - Lightning-fast build tooling and development server
- [**Hono**](https://hono.dev/) - Ultralight, modern backend framework
- [**Cloudflare Workers**](https://developers.cloudflare.com/workers/) - Edge computing platform for global deployment
- **LM Arena Integration** - AI model access through LM Arena API

## ✨ Key Features

- 🔥 Hot Module Replacement (HMR) for rapid development
- ⚡ TypeScript support with full type safety
- 🌐 Edge deployment with global CDN
- 🎯 RESTful API with comprehensive documentation
- 🖼️ Multiple AI model support
- 🔄 Model comparison capabilities
- 📱 Responsive web interface
- 🚀 Production-ready deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Cloudflare account (for deployment)

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd ai-image-generator
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   
3. **Open in Browser**
   ```
   http://localhost:8787
   ```

### Test the API

Run the included test script:
```bash
node test-api.js
```

## 📖 API Documentation

### Base URL
```
http://localhost:8787 (development)
https://your-worker.workers.dev (production)
```

### Quick Examples

**Generate Single Image:**
```bash
curl -X POST http://localhost:8787/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A sunset over ocean waves", "model": "flux-pro-1.1"}'
```

**Compare Two Models:**
```bash
curl -X POST http://localhost:8787/api/compare \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A cyberpunk cityscape", "modelA": "flux-pro-1.1", "modelB": "flux-dev"}'
```

**Batch Generate:**
```bash
curl -X POST http://localhost:8787/api/batch \
  -H "Content-Type: application/json" \
  -d '{"prompts": ["A cat in space", "A dragon"], "model": "flux-pro-1.1"}'
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/models` | List available models |
| POST | `/api/generate` | Generate single image |
| POST | `/api/compare` | Compare two models |
| POST | `/api/batch` | Batch generate images |
| GET | `/api/docs` | Full API documentation |

For complete API documentation, visit `/api/docs` or see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🎨 Usage Examples

### Web Interface
1. Open the app in your browser
2. Enter a prompt like "A majestic dragon flying over mountains"
3. Select your preferred AI model
4. Click "Generate Image" or "Compare Models"
5. View the generated images instantly

### JavaScript/Node.js
```javascript
const response = await fetch('http://localhost:8787/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A peaceful zen garden with cherry blossoms',
    model: 'flux-pro-1.1'
  })
});

const result = await response.json();
console.log('Generated image:', result.images[0].url);
```

### Python
```python
import requests

response = requests.post(
    'http://localhost:8787/api/generate',
    json={
        'prompt': 'A futuristic city with flying cars',
        'model': 'flux-pro-1.1'
    }
)

result = response.json()
if result['success']:
    print(f"Image URL: {result['images'][0]['url']}")
```

## 🏗️ Project Structure

```
ai-image-generator/
├── src/
│   ├── react-app/          # React frontend
│   │   ├── App.tsx         # Main React component
│   │   ├── App.css         # Styling
│   │   └── assets/         # Static assets
│   └── worker/
│       └── index.ts        # Hono API backend
├── public/                 # Public static files
├── test-api.js            # API testing script
├── API_DOCUMENTATION.md   # Complete API docs
├── package.json
├── vite.config.ts
├── wrangler.json         # Cloudflare Workers config
└── README.md
```

## 🚀 Deployment

### Deploy to Cloudflare Workers

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Access Your API**
   ```
   https://your-worker-name.your-subdomain.workers.dev
   ```

### Environment Configuration

For production, update the authentication in `src/worker/index.ts` or use environment variables:

```bash
wrangler secret put LM_ARENA_COOKIES
```

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run lint` - Run ESLint
- `node test-api.js` - Test API endpoints

### File Structure
- **Frontend**: React app in `src/react-app/`
- **Backend**: Hono API in `src/worker/`
- **Build**: Vite configuration in `vite.config.ts`
- **Deploy**: Cloudflare Workers config in `wrangler.json`

## 🔧 Available Models

Currently supported AI models:
- **flux-pro-1.1**: High-quality image generation
- **flux-dev**: Development version with faster processing
- *More models can be added by updating the MODELS object in the worker*

## 🎯 Features Overview

### 1. Single Image Generation
Generate high-quality images with custom prompts using your preferred AI model.

### 2. Model Comparison
Compare outputs from different AI models side-by-side to see which performs better for your specific use case.

### 3. Batch Processing
Generate multiple images with different prompts efficiently, with configurable delays to respect rate limits.

### 4. Beautiful Web Interface
Modern, responsive React interface with:
- Real-time image display
- Sample prompts
- Model selection
- Error handling
- Loading states

### 5. Comprehensive API
RESTful API with:
- Full documentation
- Type safety
- Error handling
- CORS support
- JSON responses

## 🔒 Security Considerations

- **Authentication**: Update hardcoded credentials for production
- **Rate Limiting**: Implement proper rate limiting
- **Input Validation**: Add request sanitization
- **Environment Variables**: Use secrets for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- Check the [API Documentation](./API_DOCUMENTATION.md)
- Run `node test-api.js` to verify your setup
- Visit `/api/docs` for interactive documentation
- Open an issue for bugs or feature requests

## 🌟 Acknowledgments

- Built on the Cloudflare Workers platform
- Integrates with LM Arena for AI model access
- Uses the powerful Hono framework for API development
