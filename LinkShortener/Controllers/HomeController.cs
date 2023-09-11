using LinkShortener.Models;
using LinkShortener.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LinkShortener.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationContext db;

        public HomeController(ApplicationContext context)
        {
            db = context;
        }
        [HttpPost]
        public async Task<ActionResult<string>> MakeLink([FromBody] string link)
        {
            Console.WriteLine(link);
            if (!link.StartsWith("http://") && !link.StartsWith("https://"))
                return BadRequest();
            Link lnk = new Link() { Address = link };
            await db.Links.AddAsync(lnk);
            await db.SaveChangesAsync();
           
            string domainName = HttpContext.Request.Host.ToString();
            return "https://" + domainName + "/p/" + IdConverter.Encode(lnk.Id);
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}