using AiCrawler.Core.Models;

namespace AiCrawler.Core.Interfaces
{
    public interface IExtractionService
    {
        Task<string> ExtractStructuredDataAsync(string content, string schemaDescription, CancellationToken ct = default);
    }
}
