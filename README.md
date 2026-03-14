# AI Crawler Agent

An experimental **AI Agent-powered web crawler** built with **.NET Web
API** and a modular architecture designed for integrating **AI Agents,
MCP Tools, and Web Scraping services**.

This project demonstrates how an AI agent can automatically collect
information from websites, process the data, and return summarized
insights through an API.

------------------------------------------------------------------------

# Architecture Overview

The system follows a **layered architecture inspired by Clean
Architecture**, separating responsibilities across multiple projects.

    AiCrawlerAgent.sln
    │
    ├── AiCrawler.Api            # ASP.NET Core Web API (entry point)
    ├── AiCrawler.Agent          # AI Agent logic and reasoning
    ├── AiCrawler.Tools          # MCP-compatible tools used by the agent
    ├── AiCrawler.Scraper        # Web scraping engine
    ├── AiCrawler.Core           # Domain models and interfaces
    └── AiCrawler.Infrastructure # External integrations (DB, APIs)

------------------------------------------------------------------------

# System Flow

    User Request
          ↓
    ASP.NET Web API
          ↓
    AI Agent
          ↓
    MCP Tools
          ↓
    Scraper Service
          ↓
    Target Website

The agent decides which tools to use, retrieves content from the web,
processes it, and returns a structured response.

------------------------------------------------------------------------

# Project Modules

## 1. AiCrawler.Api

The **API layer** that exposes endpoints to interact with the AI Agent.

Responsibilities: - Handle HTTP requests - Invoke the AI Agent - Return
responses to the client

Example endpoint:

    GET /api/research?topic=ai-agents

------------------------------------------------------------------------

## 2. AiCrawler.Agent

The **core intelligence layer** of the system.

Responsibilities: - Interpret user queries - Decide which tools to use -
Orchestrate workflows - Process and summarize results

Example workflow:

    User query
       ↓
    Agent reasoning
       ↓
    Call scraping tools
       ↓
    Process results
       ↓
    Return summary

------------------------------------------------------------------------

## 3. AiCrawler.Tools

This project defines **tools that the AI Agent can call**.

Tools act as an abstraction layer between the agent and the services.

Examples: - SearchWebTool - ScrapePageTool - SummarizeContentTool

This layer is designed to be **compatible with MCP-style tool usage**.

------------------------------------------------------------------------

## 4. AiCrawler.Scraper

The **web scraping engine**.

Responsibilities: - Fetch web pages - Parse HTML - Extract useful
content

Libraries commonly used: - HtmlAgilityPack - AngleSharp - Playwright
(optional for dynamic pages)

------------------------------------------------------------------------

## 5. AiCrawler.Core

The **domain layer** containing shared objects.

Includes: - Models - Interfaces - DTOs - Enums

Example models:

    Article
    ScrapeResult
    ResearchQuery

This project **should not depend on any other project**.

------------------------------------------------------------------------

## 6. AiCrawler.Infrastructure

Handles **external dependencies**.

Examples: - Databases - Vector databases - External APIs - AI providers

Example services:

    OpenAiService
    ArticleRepository

------------------------------------------------------------------------

# Technologies Used

-   .NET 8 / ASP.NET Core Web API
-   AI Agents
-   MCP-style tools
-   Web Scraping
-   HtmlAgilityPack
-   Clean Architecture principles

------------------------------------------------------------------------

# Getting Started

### 1. Clone the repository

    git clone https://github.com/yourusername/ai-crawler-agent.git

### 2. Navigate to the project

    cd AiCrawlerAgent

### 3. Restore dependencies

    dotnet restore

### 4. Run the API

    dotnet run --project AiCrawler.Api

------------------------------------------------------------------------

# Example Request

    GET /api/research?topic=AI agents

Example Response:

``` json
{
  "topic": "AI agents",
  "summary": "AI agents are autonomous systems capable of reasoning and executing tasks using tools."
}
```

------------------------------------------------------------------------

# Future Improvements

Possible enhancements for this project:

-   Add vector database for RAG
-   Support multi-agent workflows
-   Add Playwright-based scraping
-   Integrate real MCP server
-   Add semantic search
-   Implement task planning agents

------------------------------------------------------------------------

# Learning Goals

This project aims to demonstrate:

-   How AI agents interact with tools
-   How to integrate AI with backend services
-   How to design scalable AI-driven systems
-   How to build modular .NET architectures for AI applications

------------------------------------------------------------------------

# License

MIT License

------------------------------------------------------------------------

# Author

Created as a learning project for building **AI Agent systems with
.NET**.
