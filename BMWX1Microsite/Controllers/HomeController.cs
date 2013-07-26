using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BMWX1Microsite.Controllers
{
    public partial class HomeController : Controller
    {
        //
        // GET: /Home/

        public virtual ActionResult Index()
        {
            return View();
        }
        public virtual ActionResult Think()
        {
            return View();
        }
        public virtual ActionResult Move()
        {
            return View();
        }
    }
}
