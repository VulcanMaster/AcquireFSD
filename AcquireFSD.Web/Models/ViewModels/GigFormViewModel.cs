using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AcquireFSD.Web.Models.ViewModels
{
    public class GigFormViewModel
    {
        [Required]
        public string Venue { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public byte Genre { get; set; }
        [Required]
        public IEnumerable<Genre> Genres { get; set; }

        [Required]
        public DateTime DateTime
        {
            get
            {
                return DateTime.Parse(($"{Date} {Time}"));
                
            }
        }
    }
}