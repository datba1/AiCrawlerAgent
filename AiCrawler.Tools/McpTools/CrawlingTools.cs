using AiCrawler.Core.Interfaces;
using AiCrawler.Core.Models;
using ModelContextProtocol;
using System.Text.Json;

using System.ComponentModel;
using ModelContextProtocol.Server;

namespace AiCrawler.Tools.McpTools
{
    [McpServerToolType]
    public class CrawlingTools(ISearchService searchService, IScraperService scraperService)
    {
        [McpServerTool]
        [Description("Searches the web for relevant URLs based on a query.")]
        public async Task<string> search_urls(string query, int maxResults = 5)
        {
            var results = await searchService.SearchAsync(new SearchRequest(query, maxResults));
            return JsonSerializer.Serialize(results);
        }

        [McpServerTool]
        [Description("Extracts text content from a specific URL.")]
        public async Task<string> scrape_site(string url)
        {
            var result = await scraperService.ScrapeAsync(new CrawlRequest(url));
            return JsonSerializer.Serialize(result);
        }
    }
}
