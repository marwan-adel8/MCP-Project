# 🚀 GitHub Repositories MCP Server

A custom **Model Context Protocol (MCP)** server designed to integrate with **Cursor** and **Claude**. This server empowers the AI to fetch GitHub repository data for any specific username using the `server.tool` implementation.

## 🌟 Overview
This project acts as a bridge between Cursor's AI and the GitHub API. By defining custom tools, the AI can now "understand" and "retrieve" a list of repositories directly within the chat interface, making development and research much faster.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript / JavaScript
- **Protocol:** Model Context Protocol (MCP)
- **IDE Integration:** Cursor + Claude 3.5 Sonnet

## ⚙️ Features
- **Fetch User Repos:** Uses a dedicated tool to call GitHub's API.
- **Dynamic Queries:** Just tell Cursor: *"Get repositories for [username]"* and it will trigger the tool.
- **Clean Output:** Returns repo names, descriptions, and stars in a format the AI can easily process.

## 🚀 How it Works (The Logic)
The server uses the `@modelcontextprotocol/sdk` to define a tool named `get_repositories`. 
Inside the code, we use `server.tool` to:
1. Accept a `username` argument.
2. Fetch data from `https://api.github.com/users/{username}/repos`.
3. Return the results to the AI.

## 🔧 Installation & Setup in Cursor

1. **Build the project:**
   ```bash
   npm run build
