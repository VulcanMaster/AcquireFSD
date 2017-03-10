using AcquireFSD.Web.Dtos;
using AcquireFSD.Web.Models;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Web.Http;

namespace AcquireFSD.Web.Controllers
{
    [Authorize]
    public class FollowingsController : ApiController
    {
        public ApplicationDbContext _context { get; set; }

        public FollowingsController()
        {
            _context = new ApplicationDbContext();
        }

        public IHttpActionResult Follow(FollowingDto dto)
        {
            var userId = User.Identity.GetUserId();

            if (_context.Followings.Any(f => f.FolloweeId == userId && f.FolloweeId == dto.FolloweeId))
                return BadRequest("Attendance already exists.");

            var following = new Following()
            {
                FollowerId = userId,
                FolloweeId = dto.FolloweeId
            };

            _context.Followings.Add(following);
            _context.SaveChanges();

            return Ok();
        }
    }
}
