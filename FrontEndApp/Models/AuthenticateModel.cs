namespace FrontEndApp.Models
{
    #region Usings
    using System.ComponentModel.DataAnnotations;
    #endregion

    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
