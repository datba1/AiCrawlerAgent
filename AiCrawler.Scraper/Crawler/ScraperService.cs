using AiCrawler.Core.Interfaces;
using AiCrawler.Core.Models;
using Microsoft.Playwright;

namespace AiCrawler.Scraper.Crawler
{
    public class ScraperService : IScraperService
    {
        public async Task<CrawlResult> ScrapeAsync(CrawlRequest request, CancellationToken ct = default)
        {
            using var playwright = await Playwright.CreateAsync();
            
            await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
            {
                Headless = true
            });

            var context = await browser.NewContextAsync();
            var page = await context.NewPageAsync();

            try
            {
                await page.GotoAsync(request.Url, new PageGotoOptions 
                { 
                    WaitUntil = WaitUntilState.NetworkIdle,
                    Timeout = 30000 
                });

                var content = await page.InnerTextAsync("body");
                
                return new CrawlResult(request.Url, content);
            }
            catch (Exception ex)
            {
                return new CrawlResult(request.Url, string.Empty, Success: false, Error: ex.Message);
            }
        }
    }
}
