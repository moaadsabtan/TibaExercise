using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TibaExerciseApi.Models
{
    public class GitRepository
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public GitRepository(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
