namespace CCDBService.Models.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Feedback")]
    public partial class Feedback
    {
        public int FeedbackID { get; set; }

        [StringLength(20)]
        public string LastName { get; set; }

        [StringLength(10)]
        public string FistName { get; set; }

        [StringLength(24)]
        public string Phone { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(50)]
        public string Title { get; set; }

        public string Message { get; set; }
    }
}
