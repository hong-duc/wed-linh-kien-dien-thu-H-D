namespace CCDBService.Models.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Customer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        public int CustomerID { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(50)]
        public string Password { get; set; }

        [StringLength(20)]
        public string LastName { get; set; }

        [StringLength(10)]
        public string FirstName { get; set; }

        public DateTime? BirthDate { get; set; }

        public DateTime? RegDate { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        [StringLength(24)]
        public string Phone { get; set; }

        [StringLength(255)]
        public string PhotoPath { get; set; }

        [StringLength(150)]
        public string PhotoTitle { get; set; }

        public string Notes { get; set; }

        public bool? IsLogIn { get; set; }

        public DateTime? LastLogIn { get; set; }

        public DateTime? LastLogOut { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
