using Microsoft.EntityFrameworkCore.Migrations;

namespace TibaExerciseApi.Migrations
{
    public partial class MyMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Repos",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Repos", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Repos",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1L, "Test1" });

            migrationBuilder.InsertData(
                table: "Repos",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2L, "Test2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Repos");
        }
    }
}
