using Microsoft.AspNetCore.Mvc;

namespace LinkShortener.Controllers
{
    public class PublicLinkController : Controller
    {
        Dictionary<string, string> urls = new()
        {
            {"g" ,"https://google.com" },
            {"y", "https://youtube.com" }
        };
        [HttpGet]
        [Route("/p/{id}")]
        public IActionResult Index(string id)
        {
            if(urls.TryGetValue(id, out var url))
            {
                return Redirect(url);
            }
            return BadRequest();
        }
    }
}
