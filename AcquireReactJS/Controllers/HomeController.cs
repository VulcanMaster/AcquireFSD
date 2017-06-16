using AcquireReactJS.Models;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.UI;

namespace AcquireReactJS.Controllers
{
    public class HomeController : Controller
    {
        private static IList<CommentModel> _comments;

        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult GiveMeComments()
        {
            _comments = new List<CommentModel>
            {
                new CommentModel
                {
                    Id = 1,
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.NET World!"
                },
                new CommentModel
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new CommentModel
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
            };
            return Json(_comments, JsonRequestBehavior.AllowGet);
            //return View();
        }

        public ActionResult TutorialSeven()
        {
            return View();
        }



        public ActionResult TutorialSix()
        {
            return View();
        }
        public ActionResult TutorialFive()
        {
            return View();
        }
        public ActionResult TutorialFour()
        {
            return View();
        }

        public ActionResult TutorialThree()
        {
            return View();
        }

        public ActionResult TutorialTwo()
        {
            return View();
        }

        public ActionResult ExampleOne()
        {
            return View();
        }


        public ActionResult GetMessage()
        {
            return View("TestExample");
        }


        public ActionResult SimpleReactJSExample()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
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