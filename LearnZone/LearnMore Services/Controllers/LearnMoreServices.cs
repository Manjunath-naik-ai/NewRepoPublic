using Microsoft.AspNetCore.Mvc;
using LearnZoneDAL;
using System.Runtime.CompilerServices;

namespace LearnMore_Services.Controllers
{
    
    [Route ("api/[controller]")]
    [ApiController]
    public class LearnMoreServices:ControllerBase

    {
        LearnMoreRepositary repositary;
        public LearnMoreServices(LearnMoreRepositary repositary)
        {
            this.repositary = repositary;

        }
        #region  login
        [HttpGet("Login")]
        public int Login(String username , string password)
        {
            int res = 0;
            try
            {

                res = repositary.Login(username, password);
            }
            catch(Exception e)
            {
                res = -1;
            }
            return (res);
        }
        #endregion

        #region  Regiister
        [HttpPost("register")]
        public int Register(string name, string email, string passwordHash)
        {
            int res = 0;
            try
            {
                var (result, userId) = repositary.RegisterUser(name, email, passwordHash);
                res = result; // 1 = success, -1 = email exists, 0 = error
            }
            catch (Exception)
            {
                res = 0;
            }
            return res;
        }
        #endregion

    }
}
