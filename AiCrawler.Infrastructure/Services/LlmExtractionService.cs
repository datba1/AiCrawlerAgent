using AiCrawler.Core.Interfaces;
using Microsoft.Extensions.AI;

namespace AiCrawler.Infrastructure.Services
{
    public class LlmExtractionService(IChatClient chatClient) : IExtractionService
    {
        public async Task<string> ExtractStructuredDataAsync(string content, string schemaDescription, CancellationToken ct = default)
        {
            var prompt = $"Extract structured data from the following text based on this description: {schemaDescription}. Return ONLY valid JSON.\n\nText: {content}";
            
            var response = await chatClient.GetResponseAsync(prompt, cancellationToken: ct);
            
            return response.Text ?? "{}";
        }
    }
}
