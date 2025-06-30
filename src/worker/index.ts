import { Hono } from "hono";
import { cors } from "hono/cors";
import { v4 as uuidv4 } from 'uuid';

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

// Cookie header for authentication (you may want to move this to environment variables)
const cookieHeader = [
    '_ga=GA1.1.1179075061.1751006820',
    'perf_dv6Tr4n=1',
    'arena-auth-prod-v1=base64-eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0ltdHBaQ0k2SWtOVFQwNHhkM05uU0hkRlNFTkNNbGNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDJoMWIyZDZiMlZ4ZW1OeVpIWnJkM1IyYjJScExuTjFjR0ZpWVhObExtTnZMMkYxZEdodmRqRWlMQ0p6ZFdJaU9pSmhNRE5tTjJZeU5DMWlaVEl5TFRRMk1Ua3RZVEprTVMxbVkyVmpaREF5WldFMU5EY2lMQ0poZFdRaU9pSmhkWFJvWlc1MGFXTmhkR1ZrSWl3aVpYaHdJam94TnpVeE1qVXhOemsyTENKcFlYUWlPakUzTlRFeU5EZ3hPVFlzSW1WdFlXbHNJam9pSWl3aWNHaHZibVVpT2lJaUxDSmhjSEJmYldWMFlXUmhkR0VpT250OUxDSjFjMlZ5WDIxbGRHRmtZWFJoSWpwN0ltbGtJam9pWkdOaVpqSmxNVFl0WmpFNU1DMDBOall3TFRrMU5tWXROakZsWVRreVl6RmlPV00wSW4wc0luSnZiR1VpT2lKaGRYUm9aVzUwYVdOaGRHVmtJaXdpWVdGc0lqb2lZV0ZzTVNJc0ltRnRjaUk2VzNzaWJXVjBhRzlrSWpvaVlXNXZibmx0YjNWeklpd2lkR2x0WlhOMFlXMXdJam94TnpVeE1EQTJPREkwZlYwc0luTmxjM05wYjI1ZmFXUWlPaUppTTJZeU9UbGlNUzFsT0dGakxUUTJaR1V0WWpnNU1DMHpZbVl6TlRRek1UTTJNemNpTENKcGMxOWhibTl1ZVcxdmRYTWlPblJ5ZFdWOS44bU9ERWExb2RoS0tfT1B5OG5PVlc3OWNTLWVRVjZ0T3IxUEQ1NmRPT2dzIiwidG9rZW5fdHlwZSI6ImJlYXJlciIsImV4cGlyZXNfaW4iOjM2MDAsImV4cGlyZXNfYXQiOjE3NTEyNTE3OTYsInJlZnJlc2hfdG9rZW4iOiJ2eGZ5am1wa3F5dGIiLCJ1c2VyIjp7ImlkIjoiYTAzZjdmMjQtYmUyMi00NjE5LWEyZDEtZmNlY2QwMmVhNTQ3IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiZW1haWwiOiIiLCJwaG9uZSI6IiIsImxhc3Rfc2lnbl9pbl9hdCI6IjIwMjUtMDYtMjdUMDY6NDc6MDQuNjI2OTkyWiIsImFwcF9tZXRhZGF0YSI6e30sInVzZXJfbWV0YWRhdGEiOnsiaWQiOiJkY2JmMmUxNi1mMTkwLTQ2NjAtOTU2Zi02MWVhOTJjMWI5YzQifSwiaWRlbnRpdGllcyI6W10sImNyZWF0ZWRfYXQiOiIyMDI1LTA2LTI3VDA2OjQ3OjA0LjYyNTM1NVoiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wNi0zMFQwMTo0OTo1Ni40ODA5NzNaIiwiaXNfYW5vbnltb3VzIjp0cnVlfX0',
    '_ga_72FK1TMV06=GS2.1.s1751248198$o3$g1$t1751249082$j59$l0$h0',
    '__cf_bm=m9g2c93HTbAOEU8WXo.jDXpeUjRq2Wg2IXNl08eyWDI-1751249102-1.0.1.1-hk5cp.qaXX53uRIYd0WCrQnY3i6jod.UqYHpr_RAVP3NzIurCyAoRoh0gU2BSTxd3eFy0dmWcTz8o7kwbuTm58y5gOMsO16CO_JqxN1Fkjo',
    'sidebar=false',
    'ph_phc_LG7IJbVJqBsk584rbcKca0D5lV2vHguiijDrVji7yDM_posthog=%7B%22distinct_id%22%3A%22dcbf2e16-f190-4660-956f-61ea92c1b9c4%22%2C%22%24sesid%22%3A%5B1751249463034%2C%220197be86-db93-7fc2-beb5-20d16abc6da9%22%2C1751248198547%5D%2C%22%24epp%22%3Atrue%2C%22%24initial_person_info%22%3A%7B%22r%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%2C%22u%22%3A%22https%3A%2F%2Flmarena.ai%2F%22%7D%7D',
    'cf_clearance=O5.mM7DBqigmvn0kjXAQ8h2UDJIPc3MhZq6VPyixlnA-1751248938-1.2.1.1-6.1XhEXCenWhsaYBTAos6TX3CzpTXyMWjvlaV79utR0v1zzAIMEfxLzbCyP7HSASXD2Ij4yJxmbN78sg._IkHgPmiADvfWT.mH2wPtPp7CJOliXfr1uE61UK.qEQOmA5DvVg71sC_bmWaGR4LJAod977WkwVqV6o2FBaDDuzyBbdkeu7f3GJvCNCZVStD4S7KdIzXJyI6HLvs9glkf_bu37P9yG8UKlOcWs.r4tNF_WFc4yywDSxaOwdDA7BGZz8HIpVdueGYhPJDrKhAaXVq7lxt8NqC0I6U9OFcgHzR2qI4iU97lJYuOvoLiDkBP1E2SDLsmVERK4uWUXjm2nZuf6244Q6ZUFNvLAKFB6DAKUvmBCC1CBd_Z6VIXE.fK.D'
].join('; ');

// Common headers for LM Arena API calls
const getHeaders = () => ({
    'Content-Type': 'text/plain;charset=UTF-8',
    'Accept': '*/*',
    'Origin': 'https://lmarena.ai',
    'Referer': 'https://lmarena.ai/?mode=side-by-side&chat-modality=image',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Cookie': cookieHeader
});

// Available model IDs (you can expand this list)
const MODELS = {
    'flux-pro-1.1': '6e855f13-55d7-4127-8656-9168a9f4dcc0',
    'flux-dev': '69bbf7d4-9f44-447e-a868-abc4f7a31810',
    'midjourney': 'another-model-id-here', // Add actual model ID
    'dalle3': 'another-model-id-here', // Add actual model ID
};

// Function to create evaluation payload
function createEvaluationPayload(prompt: string, modelAId: string, modelBId?: string) {
    const sessionId = uuidv4();
    const userMessageId = uuidv4();
    const modelAMessageId = uuidv4();
    const modelBMessageId = uuidv4();

    const messages = [
        {
            id: userMessageId,
            role: "user",
            content: prompt,
            experimental_attachments: [],
            parentMessageIds: [],
            participantPosition: "a",
            modelId: null,
            evaluationSessionId: sessionId,
            status: "pending",
            failureReason: null
        },
        {
            id: modelAMessageId,
            role: "assistant",
            content: "",
            experimental_attachments: [],
            parentMessageIds: [userMessageId],
            participantPosition: "a",
            modelId: modelAId,
            evaluationSessionId: sessionId,
            status: "pending",
            failureReason: null
        }
    ];

    // Add second model if provided (for side-by-side comparison)
    if (modelBId) {
        messages.push({
            id: modelBMessageId,
            role: "assistant",
            content: "",
            experimental_attachments: [],
            parentMessageIds: [userMessageId],
            participantPosition: "b",
            modelId: modelBId,
            evaluationSessionId: sessionId,
            status: "pending",
            failureReason: null
        });
    }

    return {
        id: sessionId,
        mode: modelBId ? "side-by-side" : "single",
        modelAId,
        modelBId: modelBId || null,
        userMessageId,
        modelAMessageId,
        modelBMessageId,
        modality: "image",
        messages
    };
}

// Function to parse LM Arena response and extract image URLs
function parseImageResponse(responseText: string) {
    try {
        // Parse the response which contains multiple parts
        const lines = responseText.split('\n').filter(line => line.trim());
        const images = [];
        let error = null;

        for (const line of lines) {
            if (line.startsWith('b3:')) {
                // Error message
                const errorMatch = line.match(/b3:"([^"]+)"/);
                if (errorMatch) {
                    error = errorMatch[1];
                }
            } else if (line.startsWith('a2:')) {
                // Image data
                try {
                    const imageData = JSON.parse(line.substring(3));
                    if (Array.isArray(imageData)) {
                        for (const item of imageData) {
                            if (item.type === 'image' && item.image) {
                                images.push({
                                    url: item.image,
                                    mimeType: item.mimeType || 'image/png'
                                });
                            }
                        }
                    }
                } catch (parseError) {
                    console.error('Error parsing image data:', parseError);
                }
            }
        }

        return { images, error, raw: responseText };
    } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        return { images: [], error: 'Failed to parse response', raw: responseText };
    }
}

// Routes

// Health check
app.get("/api/health", (c) => {
    return c.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "AI Image Generator API"
    });
});

// Get available models
app.get("/api/models", (c) => {
    return c.json({
        models: Object.keys(MODELS).map(name => ({
            name,
            id: MODELS[name as keyof typeof MODELS]
        }))
    });
});

// Generate image with single model
app.post("/api/generate", async (c) => {
    try {
        const body = await c.req.json();
        const { prompt, model = 'flux-pro-1.1' } = body;

        if (!prompt) {
            return c.json({ error: "Prompt is required" }, 400);
        }

        const modelId = MODELS[model as keyof typeof MODELS];
        if (!modelId) {
            return c.json({ error: "Invalid model name" }, 400);
        }

        const payload = createEvaluationPayload(prompt, modelId);

        const response = await fetch('https://lmarena.ai/api/stream/create-evaluation', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();
        const parsed = parseImageResponse(responseText);

        return c.json({
            success: true,
            prompt,
            model,
            modelId,
            sessionId: payload.id,
            images: parsed.images,
            error: parsed.error,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error generating image:', error);
        return c.json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
});

// Generate images with two models for comparison
app.post("/api/compare", async (c) => {
    try {
        const body = await c.req.json();
        const { prompt, modelA = 'flux-pro-1.1', modelB = 'flux-dev' } = body;

        if (!prompt) {
            return c.json({ error: "Prompt is required" }, 400);
        }

        const modelAId = MODELS[modelA as keyof typeof MODELS];
        const modelBId = MODELS[modelB as keyof typeof MODELS];

        if (!modelAId || !modelBId) {
            return c.json({ error: "Invalid model name(s)" }, 400);
        }

        const payload = createEvaluationPayload(prompt, modelAId, modelBId);

        const response = await fetch('https://lmarena.ai/api/stream/create-evaluation', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();
        const parsed = parseImageResponse(responseText);

        return c.json({
            success: true,
            prompt,
            models: { modelA, modelB },
            modelIds: { modelA: modelAId, modelB: modelBId },
            sessionId: payload.id,
            images: parsed.images,
            error: parsed.error,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error comparing models:', error);
        return c.json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
});

// Batch generate images with multiple prompts
app.post("/api/batch", async (c) => {
    try {
        const body = await c.req.json();
        const { prompts, model = 'flux-pro-1.1', delay = 1000 } = body;

        if (!Array.isArray(prompts) || prompts.length === 0) {
            return c.json({ error: "Prompts array is required" }, 400);
        }

        if (prompts.length > 5) {
            return c.json({ error: "Maximum 5 prompts allowed per batch" }, 400);
        }

        const modelId = MODELS[model as keyof typeof MODELS];
        if (!modelId) {
            return c.json({ error: "Invalid model name" }, 400);
        }

        const results = [];

        for (let i = 0; i < prompts.length; i++) {
            const prompt = prompts[i];

            try {
                const payload = createEvaluationPayload(prompt, modelId);

                const response = await fetch('https://lmarena.ai/api/stream/create-evaluation', {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(payload)
                });

                const responseText = await response.text();
                const parsed = parseImageResponse(responseText);

                results.push({
                    prompt,
                    sessionId: payload.id,
                    images: parsed.images,
                    error: parsed.error
                });

                // Add delay between requests to avoid rate limiting
                if (i < prompts.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }

            } catch (error) {
                results.push({
                    prompt,
                    error: error instanceof Error ? error.message : 'Unknown error',
                    images: []
                });
            }
        }

        return c.json({
            success: true,
            model,
            modelId,
            results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in batch generation:', error);
        return c.json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
});

// Get session status (if you want to check generation status)
app.get("/api/session/:sessionId", async (c) => {
    const sessionId = c.req.param('sessionId');

    return c.json({
        message: "Session status endpoint - implement based on LM Arena's status API if available",
        sessionId,
        timestamp: new Date().toISOString()
    });
});

// API Documentation
app.get("/api/docs", (c) => {
    const docs = {
        title: "AI Image Generator API",
        version: "1.0.0",
        description: "Generate AI images using various models through LM Arena",
        baseURL: c.req.url.replace('/api/docs', ''),
        endpoints: {
            "GET /api/health": {
                description: "Health check endpoint",
                response: "Status information"
            },
            "GET /api/models": {
                description: "Get list of available models",
                response: "Array of model names and IDs"
            },
            "POST /api/generate": {
                description: "Generate image with single model",
                body: {
                    prompt: "string (required) - Image description",
                    model: "string (optional) - Model name (default: 'flux-pro-1.1')"
                },
                response: "Generated image URLs and metadata"
            },
            "POST /api/compare": {
                description: "Generate images with two models for comparison",
                body: {
                    prompt: "string (required) - Image description",
                    modelA: "string (optional) - First model name",
                    modelB: "string (optional) - Second model name"
                },
                response: "Generated images from both models"
            },
            "POST /api/batch": {
                description: "Generate multiple images with different prompts",
                body: {
                    prompts: "array (required) - Array of image descriptions (max 5)",
                    model: "string (optional) - Model name",
                    delay: "number (optional) - Delay between requests in ms (default: 1000)"
                },
                response: "Array of generated images for each prompt"
            },
            "GET /api/session/:sessionId": {
                description: "Get generation session status",
                response: "Session information"
            }
        },
        availableModels: Object.keys(MODELS),
        examples: {
            generateImage: {
                url: "POST /api/generate",
                body: {
                    prompt: "A beautiful sunset over mountains",
                    model: "flux-pro-1.1"
                }
            },
            compareModels: {
                url: "POST /api/compare",
                body: {
                    prompt: "A futuristic city skyline",
                    modelA: "flux-pro-1.1",
                    modelB: "flux-dev"
                }
            },
            batchGenerate: {
                url: "POST /api/batch",
                body: {
                    prompts: [
                        "A cat in space",
                        "A dragon breathing fire",
                        "A peaceful forest scene"
                    ],
                    model: "flux-pro-1.1",
                    delay: 2000
                }
            }
        }
    };

    return c.json(docs);
});

// Legacy endpoint for compatibility
app.get("/api/", (c) => c.json({
    name: "AI Image Generator API",
    version: "1.0.0",
    documentation: "/api/docs"
}));

export default app;
