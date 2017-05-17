using System.Globalization;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace AcquireFSD.Web.Controllers
{
    public class LanguageController : Controller
    {
        // GET: Language
        public ActionResult Index()
        {
            return View();
        }

        // GET: Language/Details/5
        public ActionResult ChangeLanguage(string SelectedLanguage)
        {
            if (SelectedLanguage != null)
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(SelectedLanguage);
                Thread.CurrentThread.CurrentUICulture = new CultureInfo(SelectedLanguage);
                var cookie = new HttpCookie("Language");
                cookie.Value = SelectedLanguage;
                Response.Cookies.Add(cookie);
            }
            return RedirectToAction("Index", "Home");
        }

        // GET: Language/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Language/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Language/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Language/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Language/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Language/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
