using System.ComponentModel.DataAnnotations;

namespace AcquireFSD.Web.Models.ViewModels
{
    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}