using System.Threading.Channels;

namespace AiCrawler.Core.Interfaces
{
    public interface IResearchQueue
    {
        ValueTask QueueResearchTaskAsync(string topic, Guid taskId);
        ValueTask<(string Topic, Guid TaskId)> DequeueAsync(CancellationToken ct);
    }

    public class ResearchQueue : IResearchQueue
    {
        private readonly Channel<(string, Guid)> _queue = Channel.CreateUnbounded<(string, Guid)>();

        public ValueTask QueueResearchTaskAsync(string topic, Guid taskId) => _queue.Writer.WriteAsync((topic, taskId));

        public ValueTask<(string Topic, Guid TaskId)> DequeueAsync(CancellationToken ct) => _queue.Reader.ReadAsync(ct);
    }
}
