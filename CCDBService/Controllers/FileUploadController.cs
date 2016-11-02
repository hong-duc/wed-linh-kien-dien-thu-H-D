using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Threading.Tasks;
using CCDBService.Models;
using CCDBService.Services;

namespace CCDBService.Controllers
{
    [RoutePrefix("api")]
    public class FileUploadController : ApiController
    {
        [Route("upload"), HttpPost]
        public async Task<IHttpActionResult> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            }

            var uploadProcessor = new FlowUploadProcessor("~/FileUploads");
            await uploadProcessor.ProcessUploadChunkRequest(Request);

            if (uploadProcessor.IsComplete)
            {
                // Do post processing here:
                // - Move the file to a permanent location
                // - Persist information to a database
                // - Raise an event to signal it was completed (if you are really feeling up to it)
                //      - http://www.udidahan.com/2009/06/14/domain-\events-salvation/
                //      - http://msdn.microsoft.com/en-gb/magazine/ee236415.aspx#id0400079
            }

            return Ok();
        }

        [Route("upload"), HttpGet]
        public IHttpActionResult TestFlowChunk([FromUri]FlowMetaData flowMeta)
        {
            if (FlowUploadProcessor.HasRecievedChunk(flowMeta))
            {
                return Ok();
            }

            return NotFound();
        }


    }
}
