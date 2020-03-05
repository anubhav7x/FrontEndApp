namespace FrontEndApp.Controllers
{
    #region Usings
    using Microsoft.AspNetCore.Mvc;
    using System.IO;
    #endregion

    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly string coursesJSONUrl = "ClientApp/src/assets/Catalog_DataSet_V1.json";

        [HttpGet]
        public IActionResult getCoursesData()
        {
            using (StreamReader reader = new StreamReader(coursesJSONUrl))
            {
                var courses = reader.ReadToEnd();
                return Ok(courses);
            }
        }
    }
}