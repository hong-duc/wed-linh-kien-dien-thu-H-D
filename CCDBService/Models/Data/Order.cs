namespace CCDBService.Models.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Order()
        {
            OderDetails = new HashSet<OderDetail>();
        }

        public int OrderID { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? ShippedDate { get; set; }

        [Column(TypeName = "money")]
        public decimal? Freight { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        public float? Tax { get; set; }

        public bool? IsDeliveried { get; set; }

        public int? ShipperID { get; set; }

        public int? CustomerID { get; set; }

        public int? EmployeeID { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual Employee Employee { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OderDetail> OderDetails { get; set; }

        public virtual Shipper Shipper { get; set; }
    }
}
