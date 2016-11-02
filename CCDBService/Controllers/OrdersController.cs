using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CCDBService.Models.Data;

namespace CCDBService.Controllers
{
    public class OrdersController : ApiController
    {
        private CCDBContext db = new CCDBContext();

        // GET: api/Orders
        public IQueryable<Order> GetOrders()
        {
            return db.Orders;
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        //Post: api/Order
        [HttpPost]
        public IHttpActionResult PostOrder(dynamic data)
        {
            Order order = new Order
            {
                Address = data.order.Address,
                CustomerID = data.order.CustomerID,
                EmployeeID = data.order.EmployeeID,
                Freight = data.order.Freight,
                IsDeliveried = data.order.IsDeliveried,
                OrderDate = data.order.OrderDate,
                ShippedDate = data.order.ShippedDate,
                ShipperID = data.order.ShipperID,
                Tax = data.order.Tax
            };

            foreach (var p in data.Products)
            {
                order.OderDetails.Add(new OderDetail
                {
                    ProductID = p.product.ProductID,
                    Discount = data.Discount,
                    Quantity = p.quantity,
                    UnitPrice = p.product.UnitPrice
                });
            }
            db.Orders.Add(order);

            db.SaveChanges();
            return Json(new { message = "success" });
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}