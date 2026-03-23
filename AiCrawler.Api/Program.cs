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
builder.Services.AddScoped<IAgentOrchestrator, CrawlerAgent>();

// Add simple chat client for agent (In production use real config)
var openAiConfig = builder.Configuration.GetSection("AiServices:OpenAI");
builder.Services.AddSingleton<IChatClient>(sp =>
    new OpenAI.Chat.ChatClient(openAiConfig["Model"] ?? "gpt-4o-mini", openAiConfig["ApiKey"] ?? "dummy")
        .AsIChatClient());


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:52033")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// MCP Server Setup
builder.Services.AddMcpServer(options =>
{
    options.ServerInfo = new() { Name = "AiCrawlerAgent", Version = "1.0.0" };
})
.WithStdioServerTransport()
.WithToolsFromAssembly();

var app = builder.Build();

// Enable Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.MapControllers();

// For MCP, we typically run as a long-lived process reading from Stdin
await app.RunAsync();
