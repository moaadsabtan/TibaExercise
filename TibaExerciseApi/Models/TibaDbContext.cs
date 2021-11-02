using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TibaExerciseApi.Models
{
    public class TibaDbContext : DbContext
    {
        public TibaDbContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<Repository> Repos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Repository>().HasData(new Repository
            {
                Id = 1,
                Name = "Test1"
            }, new Repository
            {
                Id = 2,
                Name = "Test2"
            });
        }
    }
}
