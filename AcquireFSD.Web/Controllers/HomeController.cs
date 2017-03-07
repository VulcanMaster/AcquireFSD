using AcquireFSD.Web.Models;
using AcquireFSD.Web.Test;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace AcquireFSD.Web.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext _context;

        public HomeController()
        {
            _context = new ApplicationDbContext();
        }

        public ActionResult Index()
        {
            var upcommingGigs = _context.Gigs
                                    .Include(g => g.Artist)
                                    .Where(g => g.DateTime > DateTime.Now);
            return View(upcommingGigs);
        }

        public ActionResult About()
        {
            var testClass = new ClassOne();

            testClass.Greetings();

            testClass.CallLogger();

            testClass.Greetings();

            testClass.CallLogger();

            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}