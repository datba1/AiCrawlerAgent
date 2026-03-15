using AiCrawler.Core.Models;

namespace AiCrawler.Core.Interfaces
{
    public interface IResearchRepository
    {
        Task AddResearchTaskAsync(ResearchTask task, CancellationToken ct = default);
        Task<ResearchTask?> GetResearchTaskAsync(Guid id, CancellationToken ct = default);
        Task<IEnumerable<ResearchTask>> GetAllResearchTasksAsync(CancellationToken ct = default);
    }
}
