using System.Web.Mvc;

namespace AcquireFSD.Web.Controllers
{
    public class ResourceTestController : Controller
    {
        // GET: ResourceTest
        public ActionResult Index()
        {
            return View();
        }

        // GET: ResourceTest/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ResourceTest/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ResourceTest/Create
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

        // GET: ResourceTest/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ResourceTest/Edit/5
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

        // GET: ResourceTest/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ResourceTest/Delete/5
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
