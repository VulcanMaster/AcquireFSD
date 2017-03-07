using System.ComponentModel.DataAnnotations;

namespace AcquireFSD.Web.Models.ViewModels
{
    class AlwaysValid : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return true;
        }
    }
}