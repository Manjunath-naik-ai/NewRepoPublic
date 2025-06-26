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
    public  class LearnMoreRepositary
    {
        private readonly LearnZoneContext context;
        public LearnMoreRepositary(LearnZoneContext context)
        {
            this.context = context;


        }
        #region  Login Method
        public int Login(string username, string password)
        {
            var res = 0;
            try
            {
                SqlParameter prmusername = new SqlParameter("@username", username);
                SqlParameter prmpassword = new SqlParameter("@password", password);
                SqlParameter prmLoginResult = new SqlParameter("@LoginResult", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output
                };

                context.Database.ExecuteSqlRaw(
                    "EXEC sp_LoginUserByRole @username, @password, @LoginResult OUTPUT",
                    prmusername, prmpassword, prmLoginResult);

                res = Convert.ToInt32(prmLoginResult.Value);
            }
            catch (Exception e)
            {
                res = 0;
                Console.WriteLine(e.Message);
            }
            return res;
        }
        #endregion

        #region Register
        public (int Result, int UserId) RegisterUser(string name, string email, string passwordHash)
        {
            int result = 0;
            int userId = 0;

            try
            {
                var prmName = new SqlParameter("@Name", name);
                var prmEmail = new SqlParameter("@Email", email);
                var prmPasswordHash = new SqlParameter("@PasswordHash", passwordHash);

                var prmUserId = new SqlParameter("@UserId", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output
                };
                var prmResult = new SqlParameter("@Result", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output
                };

                context.Database.ExecuteSqlRaw(
                    "EXEC sp_RegisterUser @Name, @Email, @PasswordHash, @UserId OUTPUT, @Result OUTPUT",
                    prmName, prmEmail, prmPasswordHash, prmUserId, prmResult
                );

                result = prmResult.Value != DBNull.Value ? Convert.ToInt32(prmResult.Value) : 0;
                userId = prmUserId.Value != DBNull.Value ? Convert.ToInt32(prmUserId.Value) : 0;
            }
            catch (Exception ex)
            {
                result = 0;
                userId = 0;
                Console.WriteLine(ex.Message);
            }

            return (result, userId);
        }
        #endregion

    }
}
