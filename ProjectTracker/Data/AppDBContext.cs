using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            var dt = DateTime.Now.ToString("MMddyyyy");
            var DueDate = DateTime.Now.ToString("MM/dd/yyyy");
            var dtfull = DateTime.Now.ToString("MM/dd/yyyy hh:mm tt");


            Post[] postsToSeed = new Post[2];

            for (int i = 1; i <= 2; i++)
            {
                postsToSeed[i - 1] = new Post
                {
                    PostId = i,
                    PNO = dt + '0' +i,
                    Title = $"Post {i}",
                    Content = $"This is post {i} and it has some very interesting content. I have also liked the video and subscribed.",
                    AssignedTo = $"Aditi",
                    DateCreated = dtfull,
                    DueDate = DueDate,
                    ProjectStatus= "In Progress"

                };
            }

            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }
    }
}
