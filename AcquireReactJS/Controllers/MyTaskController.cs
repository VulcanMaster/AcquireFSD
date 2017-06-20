using System.Web.Mvc;

namespace AcquireReactJS.Controllers
{
    public class MyTaskController : Controller
    {
        // GET: MyTask
        public ActionResult Index()
        {
            //@"C:\TFS\GIT\AcquireFSD\AcquireReactJS\Data\jsonexamplestring.txt"
            //return Content(x);
            return View();
        }

        // GET: MyTask/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: MyTask/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MyTask/Create
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

        // GET: MyTask/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: MyTask/Edit/5
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

        // GET: MyTask/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: MyTask/Delete/5
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
