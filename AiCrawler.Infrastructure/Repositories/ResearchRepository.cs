using AiCrawler.Core.Interfaces;
using AiCrawler.Core.Models;
using AiCrawler.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AiCrawler.Infrastructure.Repositories
{
    public class ResearchRepository(AppDbContext dbContext) : IResearchRepository
    {
        public async Task AddResearchTaskAsync(ResearchTask task, CancellationToken ct = default)
        {
            await dbContext.ResearchTasks.AddAsync(task, ct);
            await dbContext.SaveChangesAsync(ct);
        }

        public async Task<ResearchTask?> GetResearchTaskAsync(Guid id, CancellationToken ct = default)
        {
            return await dbContext.ResearchTasks
                .Include(t => t.ScrapedContents)
                .FirstOrDefaultAsync(t => t.Id == id, ct);
        }

        public async Task<IEnumerable<ResearchTask>> GetAllResearchTasksAsync(CancellationToken ct = default)
        {
            return await dbContext.ResearchTasks
                .Include(t => t.ScrapedContents)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync(ct);
        }
    }
}
