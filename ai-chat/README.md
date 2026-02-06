## AI Chat Demo (Node.js + Express)

This is a simple web app that lets you type a question, send it to an LLM (Claude), and display the response. It uses:

- **Backend**: Node.js + Express
- **Frontend**: Static HTML/CSS/JS served from Express
- **AI provider**: Anthropic Claude Messages API

### Prerequisites

- **Node.js** and **npm** installed
- A **Claude (Anthropic) API key**

### Setup

1. Install dependencies (already done if you ran `npm install`):

```bash
npm install
```

2. Create a `.env` file in the project root and add your API key:

```bash
CLAUDE_API_KEY=your_claude_api_key_here
```

3. Start the server:

```bash
npm start
```

4. Open the app in your browser:

- Go to `http://localhost:3000`
- Type a question into the text area
- Click **“Ask AI”**
- The AI response will appear in the **AI response** area

### Files of interest

- **`server.js`**: Express server and `/api/ask` route that calls Claude
- **`public/index.html`**: Main page with text input, submit button, and response area
- **`public/styles.css`**: Simple, clean interface styling
- **`public/main.js`**: Frontend logic that sends the question to `/api/ask` and renders the answer

"# ai-chat" 
