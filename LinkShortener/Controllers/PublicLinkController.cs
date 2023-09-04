using LinkShortener.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LinkShortener.Controllers
{
    public class PublicLinkController : Controller
    {
        private ApplicationContext db;
        public PublicLinkController(ApplicationContext context)
        {
            db = context;
        }
        [HttpGet]
        [Route("/p/{id}")]
        public async Task<IActionResult> Index(string id)
        {
            Link? link = await db.Links.FirstOrDefaultAsync(x => x.Id == IdConverter.Decode(id));
            if(link == null)
                return BadRequest();
            return Redirect(link.Address);
        }
    }
}
