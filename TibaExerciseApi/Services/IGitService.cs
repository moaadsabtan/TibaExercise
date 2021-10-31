using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TibaExerciseApi.Models;

namespace TibaExerciseApi.Services
{
    public interface IGitService
    {
        /// <summary>
        /// Search Repositories 
        /// <param name="Search">the Search Input</param>
        /// <returns>  IActionResult Of Search Repositories </returns>
        /// </summary>
        List<GitRepository> SearchRepositories(String Search);
    }
}
