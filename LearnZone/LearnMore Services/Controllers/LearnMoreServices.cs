using Microsoft.AspNetCore.Mvc;
using LearnZoneDAL;
using System.Runtime.CompilerServices;
using LearnZoneDAL.Interfaces;

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
        public Iuser Login(String username , string password)
        {
              Iuser iuser = null;
            try
            {

                iuser= repositary.Login(username, password);
            }
            catch(Exception e)
            {
                iuser = null;
            }
            return (iuser);
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
