using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TicketMaster.Models;
using Tickets.Bll.Tickets;

namespace TicketMaster.Controllers
{
    public class HomeController : Controller
    {
        private TicketBll _ticketbll;

        public HomeController()
        {
            _ticketbll = new TicketBll();
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

        [HttpPost("Home/GetAttractions")]
        public async Task<JsonResult> GetAttractions(string keyword, int pageNo)
        {
            var result = await _ticketbll.GetAttractionsList(pageNo, keyword);
            return Json(new { data = result });
        }

        [HttpPost("Home/GetEvents")]
        public async Task<JsonResult> GetEvents(string attractionId, int pageNo)
        {
            var result = await _ticketbll.GetTicketsList(attractionId, pageNo);
            return Json(new {data = result});
        }


    }
}
