using AiCrawler.Core.Models;

namespace AiCrawler.Core.Interfaces
{
    public interface ISearchService
    {
        Task<IEnumerable<SearchResult>> SearchAsync(SearchRequest request, CancellationToken ct = default);
    }

    public interface IScraperService
    {
        Task<CrawlResult> ScrapeAsync(CrawlRequest request, CancellationToken ct = default);
    }

    public interface IAgentOrchestrator
    {
        Task<string> ExecuteResearchTaskAsync(string taskDescription, CancellationToken ct = default);
    }
}
