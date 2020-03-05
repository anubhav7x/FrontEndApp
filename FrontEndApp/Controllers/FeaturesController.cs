namespace FrontEndApp.Controllers
{
    #region Usings
    using Microsoft.AspNetCore.Mvc;
    using System.IO;
    #endregion

    [Route("api/[controller]")]
    [ApiController]
    public class FeaturesController : ControllerBase
    {
        private readonly string featuresJSONUrl = "ClientApp/src/assets/FeatureDataset.json";

        [HttpGet]
        public IActionResult getFeaturesData()
        {
            using (StreamReader reader = new StreamReader(featuresJSONUrl))
            {
                var features = reader.ReadToEnd();
                return Ok(features);
            }
        }
    }
}