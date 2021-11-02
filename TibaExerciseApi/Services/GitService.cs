using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TibaExerciseApi.Models;

namespace TibaExerciseApi.Services
{
    public class GitService : IGitService
    {
        public TibaDbContext _dbContext;
        public GitService(TibaDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public List<GitRepository> SearchRepositories(String Search)
        {
            List < GitRepository > repositories  = new List<GitRepository>();
            List<GitRepository> favoritesRepositories = new List<GitRepository>();
            var content1="";

            HttpWebRequest request = WebRequest.Create("https://api.github.com/repositories?since=364") as HttpWebRequest;
            request.UserAgent = "TestApp";
            using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
            {
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    content1 = reader.ReadToEnd();

                }
            }
                JArray json = JArray.Parse(content1);
                repositories = json.ToObject<List<GitRepository>>();
            if (Search == null)
            {
                Search = "";
            }
                repositories = repositories.FindAll(x => x.Name.Trim().Contains(Search)).ToList().Take(50).ToList();
            
                return repositories;
        
        
    }
        public List<GitRepository> GetFavoritesRepositories()
        {
            List<GitRepository> repositories = new List<GitRepository>();
            List<Repository> favoritesRepFromDb = _dbContext.Repos.ToList();
            repositories = favoritesRepFromDb
       .Select(x => new GitRepository() { Id = (int)x.Id, Name = x.Name })
             .ToList();
            return repositories;
        }
            public GitRepository AddRepository(GitRepository gitRepository)
        {
            Repository r = new Repository
            {
                Name = gitRepository.Name
            };
            _dbContext.Repos.Add(r);
            _dbContext.SaveChanges();
            return gitRepository;
        }
        
    }
}
