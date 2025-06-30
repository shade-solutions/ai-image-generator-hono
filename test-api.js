#!/usr/bin/env node

// API Test Script
// Run this to test all the API endpoints

import fetch from 'node-fetch';

const API_BASE = 'http://localhost:8787'; // Local development URL
// const API_BASE = 'https://your-worker.workers.dev'; // Production URL

async function testAPI() {
    console.log('🚀 Testing AI Image Generator API...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing Health Check...');
        const healthResponse = await fetch(`${API_BASE}/api/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health:', healthData.status);
        console.log('');

        // Test 2: Get Models
        console.log('2. Testing Get Models...');
        const modelsResponse = await fetch(`${API_BASE}/api/models`);
        const modelsData = await modelsResponse.json();
        console.log('✅ Available models:', modelsData.models?.length || 0);
        console.log('');

        // Test 3: Generate Single Image
        console.log('3. Testing Single Image Generation...');
        const generateResponse = await fetch(`${API_BASE}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: 'A cute robot cat in a garden',
                model: 'flux-pro-1.1'
            })
        });

        const generateData = await generateResponse.json();
        if (generateData.success && generateData.images?.length > 0) {
            console.log('✅ Single generation successful');
            console.log('📸 Image URL:', generateData.images[0].url.substring(0, 60) + '...');
        } else {
            console.log('❌ Single generation failed:', generateData.error || 'Unknown error');
        }
        console.log('');

        // Test 4: Compare Models (commented out to avoid rate limiting during testing)
        /*
        console.log('4. Testing Model Comparison...');
        const compareResponse = await fetch(`${API_BASE}/api/compare`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: 'A futuristic city at night',
            modelA: 'flux-pro-1.1',
            modelB: 'flux-dev'
          })
        });
        
        const compareData = await compareResponse.json();
        if (compareData.success && compareData.images?.length > 0) {
          console.log('✅ Model comparison successful');
          console.log('📸 Generated', compareData.images.length, 'images');
        } else {
          console.log('❌ Model comparison failed:', compareData.error || 'Unknown error');
        }
        console.log('');
        */

        // Test 5: API Documentation
        console.log('4. Testing API Documentation...');
        const docsResponse = await fetch(`${API_BASE}/api/docs`);
        const docsData = await docsResponse.json();
        console.log('✅ Documentation available');
        console.log('📖 Endpoints:', Object.keys(docsData.endpoints || {}).length);
        console.log('');

        console.log('🎉 API testing completed!');
        console.log('');
        console.log('Next steps:');
        console.log('1. Start the development server: npm run dev');
        console.log('2. Open http://localhost:8787 in your browser');
        console.log('3. Try generating images using the web interface');
        console.log('4. Check the full API docs at http://localhost:8787/api/docs');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('');
        console.log('Make sure the development server is running:');
        console.log('npm run dev');
    }
}

// Run tests
testAPI();
