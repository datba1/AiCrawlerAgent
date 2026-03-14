using AiCrawler.Agent.Agents;
using AiCrawler.Core.Interfaces;
using AiCrawler.Infrastructure.Services;
using AiCrawler.Scraper.Crawler;
using AiCrawler.Tools.McpTools;
using Microsoft.Extensions.AI;
using ModelContextProtocol;
using OpenAI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpClient<ISearchService, TavilySearchService>();
builder.Services.AddSingleton<IScraperService, ScraperService>();
builder.Services.AddSingleton<IAgentOrchestrator, CrawlerAgent>();

// Add simple chat client for agent (In production use real config)
builder.Services.AddSingleton<IChatClient>(new OpenAIClient("dummy").AsChatClient("gpt-4o"));

builder.Services.AddControllers();

// MCP Server Setup
builder.Services.AddMcpServer(options => 
{
    options.ServerInfo = new () { Name = "AiCrawlerAgent", Version = "1.0.0" };
})
.WithStdioServerTransport()
.WithToolsFromAssembly();

var app = builder.Build();

app.MapControllers();

// For MCP, we typically run as a long-lived process reading from Stdin
await app.RunAsync();
