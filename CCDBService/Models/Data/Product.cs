namespace CCDBService.Models.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            OderDetails = new HashSet<OderDetail>();
        }

        public int ProductID { get; set; }

        [StringLength(250)]
        public string ProductName { get; set; }

        public int? Storage { get; set; }

        [Column(TypeName = "money")]
        public decimal? UnitPrice { get; set; }

        public string Description { get; set; }

        [StringLength(255)]
        public string PhotoPath { get; set; }

        [StringLength(250)]
        public string PhotoTitle { get; set; }

        public DateTime? UpdateDate { get; set; }

        public bool? IsDiscount { get; set; }

        public int? Warranty { get; set; }

        public int? Capacity { get; set; }

        [StringLength(20)]
        public string ConnectPort { get; set; }

        public int? WriteSpeed { get; set; }

        public int? ReadSpeed { get; set; }

        [StringLength(50)]
        public string SupportOS { get; set; }

        public int? SupplierID { get; set; }

        public int? CategoryID { get; set; }

        public virtual Category Category { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OderDetail> OderDetails { get; set; }

        public virtual Supplier Supplier { get; set; }
    }
}
