#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       Compliance Analysis Tool - Quick Share               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed."
    echo ""
    echo "Please install ngrok first:"
    echo "  npm install -g ngrok"
    echo ""
    echo "Or visit: https://ngrok.com/download"
    exit 1
fi

# Start the server in the background
echo "🚀 Starting local server..."
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Start ngrok
echo "🔗 Creating public tunnel..."
echo ""
ngrok http 3000

# When ngrok is stopped, kill the server
echo ""
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null

echo "✅ Server stopped."
