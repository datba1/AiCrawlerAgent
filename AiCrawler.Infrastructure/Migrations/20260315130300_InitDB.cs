using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AiCrawler.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ResearchTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Topic = table.Column<string>(type: "text", nullable: false),
                    Summary = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResearchTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScrapedContents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Summary = table.Column<string>(type: "text", nullable: true),
                    ScrapedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ResearchTaskId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScrapedContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScrapedContents_ResearchTasks_ResearchTaskId",
                        column: x => x.ResearchTaskId,
                        principalTable: "ResearchTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScrapedContents_ResearchTaskId",
                table: "ScrapedContents",
                column: "ResearchTaskId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScrapedContents");

            migrationBuilder.DropTable(
                name: "ResearchTasks");
        }
    }
}
