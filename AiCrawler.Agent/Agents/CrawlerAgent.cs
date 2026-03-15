using AiCrawler.Core.Interfaces;
using AiCrawler.Core.Models;
using Microsoft.Extensions.AI;
using System.Text;

namespace AiCrawler.Agent.Agents
{
    public class CrawlerAgent(
        ISearchService searchService,
        IScraperService scraperService,
        IExtractionService extractionService,
        IResearchRepository repository,
        IChatClient chatClient) : IAgentOrchestrator
    {
        public async Task<string> ExecuteResearchTaskAsync(string taskDescription, CancellationToken ct = default)
        {
            var researchTask = new ResearchTask
            {
                Topic = taskDescription,
                CreatedAt = DateTime.UtcNow
            };

            // Define tools for the agent
            var tools = new ChatTool[]
            {
                ChatTool.CreateFromCallback("search_web", 
                    async (string query) => await searchService.SearchAsync(new SearchRequest(query), ct)),
                ChatTool.CreateFromCallback("scrape_page", 
                    async (string url) => await scraperService.ScrapeAsync(new CrawlRequest(url), ct)),
                ChatTool.CreateFromCallback("extract_structured_data",
                    async (string content, string schema) => await extractionService.ExtractStructuredDataAsync(content, schema, ct))
            };


            var chatOptions = new ChatOptions { Tools = tools };
            var messages = new List<ChatMessage>
            {
                new ChatMessage(ChatRole.System, "You are an expert research agent. Use the search_web tool to find URLs and the scrape_page tool to extract content. Goal: Provide a comprehensive report on the user's topic. Persist important findings."),
                new ChatMessage(ChatRole.User, taskDescription)
            };

            // Autonomous Loop
            bool isDone = false;
            int iterations = 0;
            var reportBuilder = new StringBuilder();

            while (!isDone && iterations < 5)
            {
                iterations++;
                var response = await chatClient.GetResponseAsync(messages, chatOptions, ct);
                messages.Add(response.Message);

                if (response.Message.Contents.OfType<ChatToolCallContent>().Any())
                {
                    foreach (var toolCall in response.Message.Contents.OfType<ChatToolCallContent>())
                    {
                        // The framework handles the callback execution if we use GetRequiredService<IChatClient>().AsBuilder().UseFunctionInvocation()...
                        // But for simplicity in this manual loop:
                        if (toolCall.Name == "search_web")
                        {
                            var query = toolCall.Arguments?["query"]?.ToString() ?? "";
                            var results = await searchService.SearchAsync(new SearchRequest(query), ct);
                            messages.Add(new ChatMessage(ChatRole.Tool, $"Discovered {results.Count()} results for '{query}'") { Contents = { new ChatToolResponseContent(toolCall.CallId, results) } });
                        }
                        else if (toolCall.Name == "scrape_page")
                        {
                            var url = toolCall.Arguments?["url"]?.ToString() ?? "";
                            var result = await scraperService.ScrapeAsync(new CrawlRequest(url), ct);
                            
                            if (result.Success)
                            {
                                researchTask.ScrapedContents.Add(new ScrapedContent
                                {
                                    Title = "Extracted Page", // Ideally extract title from content
                                    Url = url,
                                    Content = result.Content,
                                    ScrapedAt = DateTime.UtcNow
                                });
                            }
                            messages.Add(new ChatMessage(ChatRole.Tool, result.Success ? "Successfully scraped content." : $"Error: {result.Error}") { Contents = { new ChatToolResponseContent(toolCall.CallId, result) } });
                        }
                        else if (toolCall.Name == "extract_structured_data")
                        {
                            var content = toolCall.Arguments?["content"]?.ToString() ?? "";
                            var schema = toolCall.Arguments?["schema"]?.ToString() ?? "";
                            var extracted = await extractionService.ExtractStructuredDataAsync(content, schema, ct);
                            messages.Add(new ChatMessage(ChatRole.Tool, "Extracted structured data.") { Contents = { new ChatToolResponseContent(toolCall.CallId, extracted) } });
                        }
                    }
                }
                else
                {
                    reportBuilder.Append(response.Text);
                    isDone = true;
                }
            }

            researchTask.Summary = reportBuilder.ToString();
            await repository.AddResearchTaskAsync(researchTask, ct);

            return researchTask.Summary;
        }

        private async Task<string> SummarizeContentAsync(string content, string context, CancellationToken ct)
        {
            var response = await chatClient.GetResponseAsync(
                $"Summarize the following content in the context of: {context}. Limit to 2 sentences.\n\nContent: {content}",
                cancellationToken: ct);

            return response.Text ?? "No summary available.";
        }
    }
}
