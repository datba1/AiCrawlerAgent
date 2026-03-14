namespace AiCrawler.Core.Models
{
    public record SearchResult(string Title, string Url, string Snippet, double? Score = null);

    public record SearchRequest(string Query, int MaxResults = 5);

    public record CrawlRequest(string Url, string? ExtractionPrompt = null);

    public record CrawlResult(string Url, string Content, string? ExtractedData = null, bool Success = true, string? Error = null);

    public record ExtractedInfo(string SourceUrl, string RawContent, Dictionary<string, object> Data);
}
