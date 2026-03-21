using AiCrawler.Core.Interfaces;
using AiCrawler.Core.Models;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace AiCrawler.Infrastructure.Services
{
    public class TavilySearchService(HttpClient httpClient, Microsoft.Extensions.Configuration.IConfiguration configuration) : ISearchService
    {
        private string ApiKey => configuration["AiServices:Tavily:ApiKey"] ?? string.Empty;

        public async Task<IEnumerable<SearchResult>> SearchAsync(SearchRequest request, CancellationToken ct = default)
        {
            var response = await httpClient.PostAsJsonAsync("https://api.tavily.com/search", new
            {
                api_key = ApiKey,
                query = request.Query,
                search_depth = "advanced",
                max_results = request.MaxResults
            }, ct);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync(ct);
                throw new HttpRequestException($"Tavily API returned {response.StatusCode}: {errorBody}");
            }

            var result = await response.Content.ReadFromJsonAsync<TavilyResponse>(cancellationToken: ct);

            return result?.Results.Select(r => new SearchResult(r.Title, r.Url, r.Content, r.Score)) ?? [];
        }

        private record TavilyResponse(
            [property: JsonPropertyName("results")] List<TavilyResult> Results);

        private record TavilyResult(
            [property: JsonPropertyName("title")] string Title,
            [property: JsonPropertyName("url")] string Url,
            [property: JsonPropertyName("content")] string Content,
            [property: JsonPropertyName("score")] double Score);
    }
}
