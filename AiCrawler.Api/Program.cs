using AiCrawler.Agent.Agents;
using AiCrawler.Core.Interfaces;
using AiCrawler.Infrastructure.Services;
using AiCrawler.Scraper.Crawler;
using AiCrawler.Tools.McpTools;
using Microsoft.Extensions.AI;
using ModelContextProtocol;
using AiCrawler.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using OpenAI;
using AiCrawler.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSingleton<IResearchQueue, ResearchQueue>();
builder.Services.AddHostedService<ResearchBackgroundService>();

builder.Services.AddHttpClient<ISearchService, TavilySearchService>();
builder.Services.AddScoped<IResearchRepository, ResearchRepository>();
builder.Services.AddScoped<IExtractionService, LlmExtractionService>();
builder.Services.AddSingleton<IScraperService, ScraperService>();
builder.Services.AddSingleton<IAgentOrchestrator, CrawlerAgent>();

// Add simple chat client for agent (In production use real config)
var openAiConfig = builder.Configuration.GetSection("AiServices:OpenAI");
builder.Services.AddSingleton<IChatClient>(new OpenAIClient(openAiConfig["ApiKey"] ?? "dummy")
    .AsChatClient(openAiConfig["Model"] ?? "gpt-4o"));

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
