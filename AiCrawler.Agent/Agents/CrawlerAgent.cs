using AiCrawler.Core.Interfaces;
using AiCrawler.Core.Models;
using Microsoft.Extensions.AI;
using System.Text;

namespace AiCrawler.Agent.Agents
{
    public class CrawlerAgent(
        ISearchService searchService,
        IScraperService scraperService,
        IResearchRepository repository,
        IChatClient chatClient) : IAgentOrchestrator
    {
        public async Task<string> ExecuteResearchTaskAsync(string taskDescription, CancellationToken ct = default)
        {
            var searchResults = await searchService.SearchAsync(new SearchRequest(taskDescription), ct);

            var researchTask = new ResearchTask
            {
                Topic = taskDescription,
                CreatedAt = DateTime.UtcNow
            };

            var report = new StringBuilder();
            report.AppendLine($"# Research Report: {taskDescription}");
            report.AppendLine("\n## Discovered Sources:");

            foreach (var result in searchResults.Take(3))
            {
                report.AppendLine($"- [{result.Title}]({result.Url})");

                var crawlResult = await scraperService.ScrapeAsync(new CrawlRequest(result.Url), ct);

                if (crawlResult.Success)
                {
                    var summary = await SummarizeContentAsync(crawlResult.Content, taskDescription, ct);
                    report.AppendLine($"  - **Summary**: {summary}");

                    researchTask.ScrapedContents.Add(new ScrapedContent
                    {
                        Title = result.Title,
                        Url = result.Url,
                        Content = crawlResult.Content,
                        Summary = summary,
                        ScrapedAt = DateTime.UtcNow
                    });
                }
            }

            researchTask.Summary = report.ToString();
            await repository.AddResearchTaskAsync(researchTask, ct);

            return report.ToString();
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
