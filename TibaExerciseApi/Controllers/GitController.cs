using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TibaExerciseApi.Models;
using TibaExerciseApi.Services;

namespace TibaExerciseApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GitController : ControllerBase
    {
        private IGitService _gitService;        

        public GitController(IGitService gitService)
        {
            _gitService = gitService;
        }
        /// <summary>
        /// Search Repositories 
        /// <param name="Search">the Search Input</param>
        /// <returns>  IActionResult Of Search Repositories </returns>
        /// </summary>
        [Route("SearchRepositories")]
        [HttpGet]
        public ActionResult<List<GitRepository>> SearchRepositories(String Search)
        {
            try
            {
                List<GitRepository> response = _gitService.SearchRepositories(Search);

                return Ok(response);
            }
            catch(Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [Route("GetFavoritesRepositories")]
        [HttpGet]
        public ActionResult<List<GitRepository>> GetFavoritesRepositories()
        {
            try
            {
                List<GitRepository> response = _gitService.GetFavoritesRepositories();

                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpPost]
        [Route("AddRepository")]
        public ActionResult<GitRepository> AddRepository(GitRepository gitRepository)
        {
            GitRepository response = _gitService.AddRepository(gitRepository);

            return Ok(response);
        }

    }
}
