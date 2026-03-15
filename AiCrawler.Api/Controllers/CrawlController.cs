using AiCrawler.Core.Interfaces;
using AiCrawler.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace AiCrawler.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class CrawlController(IAgentOrchestrator orchestrator, ISearchService searchService, IScraperService scraperService) : ControllerBase
    {
        [HttpGet("research")]
        public async Task<IActionResult> Research([FromQuery] string topic)
        {
            if (string.IsNullOrEmpty(topic))
            {
                return BadRequest("Topic is required");
            }

            var result = await orchestrator.ExecuteResearchTaskAsync(topic);
            return Ok(new { topic, summary = result });
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Query is required");
            }

            var result = await searchService.SearchAsync(new SearchRequest(query));
            return Ok(result);
        }

        [HttpGet("scrape")]
        public async Task<IActionResult> Scrape([FromQuery] string url)
        {
            if (string.IsNullOrEmpty(url))
            {
                return BadRequest("Url is required");
            }

            var result = await scraperService.ScrapeAsync(new CrawlRequest(url));
            return Ok(result);
        }
    }
}
