using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TibaExerciseApi.Models
{
    public class SearchRepositoriesList
    {
        public List<GitRepository> GitRepository { get; set; }
        public List<GitRepository> FavoritesRepository { get; set; }
    }
}
