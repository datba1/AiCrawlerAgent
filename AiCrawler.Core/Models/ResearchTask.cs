using System;
using System.Collections.Generic;

namespace AiCrawler.Core.Models
{
    public class ResearchTask
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Topic { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public List<ScrapedContent> ScrapedContents { get; set; } = new();
    }
}
