using System;

namespace AiCrawler.Core.Models
{
    public class ScrapedContent
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public DateTime ScrapedAt { get; set; } = DateTime.UtcNow;

        public Guid ResearchTaskId { get; set; }
        public ResearchTask? ResearchTask { get; set; }
    }
}
