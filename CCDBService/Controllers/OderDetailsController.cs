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
    public class OderDetailsController : ApiController
    {
        private CCDBContext db = new CCDBContext();

        // GET: api/OderDetails
        public IQueryable<OderDetail> GetOderDetails()
        {
            return db.OderDetails;
        }

        // GET: api/OderDetails/5
        [ResponseType(typeof(OderDetail))]
        public IHttpActionResult GetOderDetail(int id)
        {
            OderDetail oderDetail = db.OderDetails.Find(id);
            if (oderDetail == null)
            {
                return NotFound();
            }

            return Ok(oderDetail);
        }

        // GET: api/OderDetails?orderid=int
        public IQueryable<OderDetail> GetOderDetailsByOrderID(int orderid)
        {
            return db.OderDetails.Where(x => x.OrderID == orderid);
        }

        // PUT: api/OderDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOderDetail(int id, OderDetail oderDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != oderDetail.ProductID)
            {
                return BadRequest();
            }

            db.Entry(oderDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OderDetailExists(id))
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

        // POST: api/OderDetails
        [ResponseType(typeof(OderDetail))]
        public IHttpActionResult PostOderDetail(OderDetail oderDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OderDetails.Add(oderDetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OderDetailExists(oderDetail.ProductID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = oderDetail.ProductID }, oderDetail);
        }

        // DELETE: api/OderDetails/5
        [ResponseType(typeof(OderDetail))]
        public IHttpActionResult DeleteOderDetail(int id)
        {
            OderDetail oderDetail = db.OderDetails.Find(id);
            if (oderDetail == null)
            {
                return NotFound();
            }

            db.OderDetails.Remove(oderDetail);
            db.SaveChanges();

            return Ok(oderDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OderDetailExists(int id)
        {
            return db.OderDetails.Count(e => e.ProductID == id) > 0;
        }
    }
}