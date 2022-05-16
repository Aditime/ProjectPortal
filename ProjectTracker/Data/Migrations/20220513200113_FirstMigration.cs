using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectTracker.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PNO = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 1000000, nullable: false),
                    AssignedTo = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    DateCreated = table.Column<string>(type: "TEXT", nullable: false),
                    DueDate = table.Column<string>(type: "TEXT", nullable: false),
                    ProjectStatus = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "AssignedTo", "Content", "DateCreated", "DueDate", "PNO", "ProjectStatus", "Title" },
                values: new object[] { 1, "Aditi", "This is post 1 and it has some very interesting content. I have also liked the video and subscribed.", "05/13/2022 02:01 PM", "05/13/2022", "0513202201", "In Progress", "Post 1" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "AssignedTo", "Content", "DateCreated", "DueDate", "PNO", "ProjectStatus", "Title" },
                values: new object[] { 2, "Aditi", "This is post 2 and it has some very interesting content. I have also liked the video and subscribed.", "05/13/2022 02:01 PM", "05/13/2022", "0513202202", "In Progress", "Post 2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
