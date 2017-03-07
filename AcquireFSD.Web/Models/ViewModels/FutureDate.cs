using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace AcquireFSD.Web.Models.ViewModels
{
    public class FutureDate : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            DateTime dateTime;
            var isValid = DateTime.TryParseExact(Convert.ToString(value), 
                "d MMM yyyy",
                CultureInfo.CurrentCulture,
                DateTimeStyles.None, 
                out dateTime);
            return isValid;
            //return (isValid && dateTime > DateTime.Now);
            //return base.IsValid(value); // was by default ootb
        }
    }
}