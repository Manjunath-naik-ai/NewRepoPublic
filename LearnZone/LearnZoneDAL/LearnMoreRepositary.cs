using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearnZoneDAL.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace LearnZoneDAL
{
    public  class LearnMoreRepositary:LearnZoneContext
    {
        private LearnMoreRepositary context;
        public LearnMoreRepositary(LearnMoreRepositary context)
        {
            this.context = context;


        }

        public int Login(string username, string password)
        {
            var res = 0;
            int numberofrows = 0;
            
           
            try
            {
                SqlParameter prmusername = new SqlParameter("@username", username);
                SqlParameter prmpassword = new SqlParameter("@password", password);
                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

               numberofrows= context.Database.ExecuteSqlRaw("Exec @ReturnResult=sp_LoginUserByRole @username,@password", prmReturnResult, prmusername, prmpassword);
                res = Convert.ToInt32(prmReturnResult.Value);
            }
            catch(Exception e)
            {
                res = 0;
                Console.WriteLine(e.Message);
            }
            return res;
        }
    }
}
