# AI Image Generator API Documentation

A comprehensive REST API for generating AI images using various models through LM Arena integration.

## Base URL
```
https://your-worker-domain.workers.dev
```

## API Endpoints

### Health Check
**GET** `/api/health`

Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-06-30T02:30:00.000Z",
  "service": "AI Image Generator API"
}
```

### Get Available Models
**GET** `/api/models`

Retrieve list of available AI models.

**Response:**
```json
{
  "models": [
    {
      "name": "flux-pro-1.1",
      "id": "6e855f13-55d7-4127-8656-9168a9f4dcc0"
    },
    {
      "name": "flux-dev",
      "id": "69bbf7d4-9f44-447e-a868-abc4f7a31810"
    }
  ]
}
```

### Generate Single Image
**POST** `/api/generate`

Generate an image using a single AI model.

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains",
  "model": "flux-pro-1.1"
}
```

**Parameters:**
- `prompt` (string, required): Description of the image to generate
- `model` (string, optional): Model name (default: "flux-pro-1.1")

**Response:**
```json
{
  "success": true,
  "prompt": "A beautiful sunset over mountains",
  "model": "flux-pro-1.1",
  "modelId": "6e855f13-55d7-4127-8656-9168a9f4dcc0",
  "sessionId": "uuid-session-id",
  "images": [
    {
      "url": "https://messages-prod.27c852f3500f38c1e7786e2c9ff9e48f.r2.cloudflarestorage.com/...",
      "mimeType": "image/png"
    }
  ],
  "error": null,
  "timestamp": "2025-06-30T02:30:00.000Z"
}
```

### Compare Two Models
**POST** `/api/compare`

Generate images using two different models for comparison.

**Request Body:**
```json
{
  "prompt": "A futuristic cyberpunk cityscape",
  "modelA": "flux-pro-1.1",
  "modelB": "flux-dev"
}
```

**Parameters:**
- `prompt` (string, required): Description of the image to generate
- `modelA` (string, optional): First model name (default: "flux-pro-1.1")
- `modelB` (string, optional): Second model name (default: "flux-dev")

**Response:**
```json
{
  "success": true,
  "prompt": "A futuristic cyberpunk cityscape",
  "models": {
    "modelA": "flux-pro-1.1",
    "modelB": "flux-dev"
  },
  "modelIds": {
    "modelA": "6e855f13-55d7-4127-8656-9168a9f4dcc0",
    "modelB": "69bbf7d4-9f44-447e-a868-abc4f7a31810"
  },
  "sessionId": "uuid-session-id",
  "images": [
    {
      "url": "https://model-a-image-url...",
      "mimeType": "image/png"
    },
    {
      "url": "https://model-b-image-url...",
      "mimeType": "image/png"
    }
  ],
  "error": null,
  "timestamp": "2025-06-30T02:30:00.000Z"
}
```

### Batch Generate Images
**POST** `/api/batch`

Generate multiple images with different prompts in a single request.

**Request Body:**
```json
{
  "prompts": [
    "A cat in space",
    "A dragon breathing fire",
    "A peaceful forest scene"
  ],
  "model": "flux-pro-1.1",
  "delay": 2000
}
```

**Parameters:**
- `prompts` (array, required): Array of image descriptions (max 5)
- `model` (string, optional): Model name (default: "flux-pro-1.1")
- `delay` (number, optional): Delay between requests in milliseconds (default: 1000)

**Response:**
```json
{
  "success": true,
  "model": "flux-pro-1.1",
  "modelId": "6e855f13-55d7-4127-8656-9168a9f4dcc0",
  "results": [
    {
      "prompt": "A cat in space",
      "sessionId": "uuid-session-id-1",
      "images": [
        {
          "url": "https://image-url-1...",
          "mimeType": "image/png"
        }
      ],
      "error": null
    },
    {
      "prompt": "A dragon breathing fire",
      "sessionId": "uuid-session-id-2",
      "images": [
        {
          "url": "https://image-url-2...",
          "mimeType": "image/png"
        }
      ],
      "error": null
    }
  ],
  "timestamp": "2025-06-30T02:30:00.000Z"
}
```

### Get Session Status
**GET** `/api/session/:sessionId`

Check the status of a generation session.

**Response:**
```json
{
  "message": "Session status endpoint - implement based on LM Arena's status API if available",
  "sessionId": "uuid-session-id",
  "timestamp": "2025-06-30T02:30:00.000Z"
}
```

### API Documentation
**GET** `/api/docs`

Get this complete API documentation in JSON format.

## Available Models

Currently supported models:
- `flux-pro-1.1`: Flux Pro 1.1 (ID: 6e855f13-55d7-4127-8656-9168a9f4dcc0)
- `flux-dev`: Flux Dev (ID: 69bbf7d4-9f44-447e-a868-abc4f7a31810)

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `500`: Internal Server Error

Error responses have the following format:
```json
{
  "error": "Error message description",
  "details": "Additional error details if available"
}
```

## Rate Limiting

To avoid overwhelming the LM Arena API:
- Batch requests are limited to 5 prompts maximum
- There's a configurable delay between batch requests (default: 1000ms)
- Consider implementing your own rate limiting for production use

## Authentication

The current implementation uses hardcoded authentication cookies for LM Arena. In production:
1. Move sensitive credentials to environment variables
2. Implement proper authentication handling
3. Add request validation and sanitization

## Example Usage

### JavaScript/Node.js
```javascript
// Generate single image
const response = await fetch('https://your-worker.workers.dev/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A majestic dragon flying over mountains',
    model: 'flux-pro-1.1'
  })
});

const result = await response.json();
console.log('Generated image:', result.images[0].url);
```

### cURL
```bash
# Generate image
curl -X POST https://your-worker.workers.dev/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A sunset over ocean waves", "model": "flux-pro-1.1"}'

# Compare models
curl -X POST https://your-worker.workers.dev/api/compare \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A cyberpunk cityscape", "modelA": "flux-pro-1.1", "modelB": "flux-dev"}'
```

### Python
```python
import requests

# Generate image
response = requests.post(
    'https://your-worker.workers.dev/api/generate',
    json={
        'prompt': 'A peaceful zen garden',
        'model': 'flux-pro-1.1'
    }
)

result = response.json()
if result['success']:
    print(f"Image URL: {result['images'][0]['url']}")
```

## Deployment

This API is built with:
- **Hono** - Fast web framework
- **Cloudflare Workers** - Serverless runtime
- **TypeScript** - Type safety
- **Vite** - Build tool

To deploy:
1. Configure your Cloudflare Workers environment
2. Update authentication credentials in environment variables
3. Deploy using `npm run deploy`

## Notes

- Images are hosted on Cloudflare R2 storage
- URLs are pre-signed and have expiration times
- The API acts as a proxy to LM Arena's image generation service
- Response parsing handles the specific format returned by LM Arena
