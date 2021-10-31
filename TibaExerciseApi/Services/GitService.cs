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
        public GitService()
        {
            
        }
        public List<GitRepository> SearchRepositories(String Search)
        {
            List < GitRepository > repositories  = new List<GitRepository>();
            var content1="";
            HttpWebRequest request = WebRequest.Create("https://api.github.com/repositories") as HttpWebRequest;
            request.UserAgent = "TestApp";
            using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(response.GetResponseStream());
                content1 = reader.ReadToEnd();
                repositories.Add(new GitRepository(1,"rep1"));
                repositories.Add(new GitRepository(2, "rep2"));
                repositories.Add(new GitRepository(3, "rep3"));
            }

            return repositories.FindAll(l=>l.Name.IndexOf(Search==null?"":Search)!=-1).Take(50).ToList();
        }
    }
}
