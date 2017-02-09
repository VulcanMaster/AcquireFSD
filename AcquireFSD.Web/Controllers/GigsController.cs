﻿using AcquireFSD.Web.Models;
using AcquireFSD.Web.Models.ViewModels;
using System.Linq;
using System.Web.Mvc;

namespace AcquireFSD.Web.Controllers
{
    public class GigsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public GigsController()
        {
            _context = new ApplicationDbContext();
        }

        public ActionResult Create()
        {
            var viewModel = new GigFormViewModel()
            {
                Genres = _context.Genres.ToList()
            };

            return View(viewModel);
        }
    }
}