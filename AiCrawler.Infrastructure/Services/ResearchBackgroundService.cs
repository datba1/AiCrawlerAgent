using AiCrawler.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AiCrawler.Infrastructure.Services
{
    public class ResearchBackgroundService(
        IResearchQueue researchQueue,
        IServiceScopeFactory scopeFactory,
        ILogger<ResearchBackgroundService> logger) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            logger.LogInformation("Research Background Service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var (topic, taskId) = await researchQueue.DequeueAsync(stoppingToken);

                    logger.LogInformation("Processing research task {TaskId} for topic: {Topic}", taskId, topic);

                    using var scope = scopeFactory.CreateScope();
                    var orchestrator = scope.ServiceProvider.GetRequiredService<IAgentOrchestrator>();

                    // We might want to update the task status in the DB here
                    await orchestrator.ExecuteResearchTaskAsync(topic, stoppingToken);

                    logger.LogInformation("Completed research task {TaskId}", taskId);
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Error processing research task.");
                }
            }

            logger.LogInformation("Research Background Service is stopping.");
        }
    }
}
