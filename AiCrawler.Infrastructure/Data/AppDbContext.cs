using AiCrawler.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace AiCrawler.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ResearchTask> ResearchTasks { get; set; }
        public DbSet<ScrapedContent> ScrapedContents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ResearchTask>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Topic).IsRequired();
                entity.HasMany(e => e.ScrapedContents)
                      .WithOne(e => e.ResearchTask)
                      .HasForeignKey(e => e.ResearchTaskId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ScrapedContent>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Url).IsRequired();
                entity.Property(e => e.Content).IsRequired();
            });
        }
    }
}
