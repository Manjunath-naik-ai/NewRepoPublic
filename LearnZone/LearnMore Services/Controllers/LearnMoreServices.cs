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
        [HttpGet]
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


    }
}
