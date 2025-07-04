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

        #region ViewCourse
        public List<Course> viewAllCoourse()
        {
            List<Course> course = new List<Course>();
            try
            {
                 course = (from c in context.Courses
                               select c).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                course = null;
            }
            return course;
        }
        #endregion

        #region changepassword
        public bool ChangePassword(int userId, string newPassword)
        {
            bool isChanged = false;
            try
            {
                var prmUserId = new SqlParameter("@UserId", userId);
                var prmNewPassword = new SqlParameter("@NewPassword", newPassword);
                var prmResult = new SqlParameter("@Result", System.Data.SqlDbType.Bit)
                {
                    Direction = System.Data.ParameterDirection.Output
                };
                context.Database.ExecuteSqlRaw(
                    "EXEC sp_ChangePassword @UserId, @NewPassword, @Result OUTPUT",
                    prmUserId, prmNewPassword, prmResult);
                isChanged = Convert.ToBoolean(prmResult.Value);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                isChanged = false;
            }
            return isChanged;
        }
        #endregion

        #region Enrollment
        public bool EnrollUser(int userId, int courseId)
    {
        try
        {
            // Optional: Check if user and course exist
            var userExists = context.Users.Any(u => u.UserId == userId);
        var courseExists = context.Courses.Any(c => c.CourseId == courseId);

            if (!userExists || !courseExists)
                return false;

            var enrollment = new Enrollment
            {
                UserId = userId,
                CourseId = courseId,
                EnrolledAt = DateTime.Now,
                Progress = 0
            };

                context.Enrollments.Add(enrollment);
                context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error enrolling user: " + ex.Message);
            return false;
        }
    }

        #endregion

        #region view Allchapters
        public List<Chapter> GetChaptersByCourseId(int courseId)
        {
            List<Chapter> ch = new List<Chapter>();
            try
            {

                ch= context.Chapters
                    .Where(c => c.CourseId == courseId)
                    .OrderBy(c => c.Order)
                    .ToList();
            }
            catch(Exception ex)
            {
                ch = null;
                Console.WriteLine("Error retrieving chapters: " + ex.Message);
              
            }
            return ch;
        }

        #endregion

        #region editUserProfile
        public bool EditUserProfile(User dto)
        {
            try
            {
                var user = context.Users.FirstOrDefault(u => u.UserId == dto.UserId);
                if (user == null)
                    return false;

                user.Name = dto.Name;
                user.Email = dto.Email;

                context.Users.Update(user);
                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error updating user: " + ex.Message);
                return false;
            }
        }


        #endregion

        #region  Feedback
        public bool SubmitFeedback(Feedback dto)
        {
            try
            {
                // Optionally check if user and course exist
                var userExists = context.Users.Any(u => u.UserId == dto.UserId);
                var courseExists = context.Courses.Any(c => c.CourseId == dto.CourseId);

                if (!userExists || !courseExists)
                    return false;

                var feedback = new Feedback
                {
                    UserId = dto.UserId,
                    CourseId = dto.CourseId,
                    Rating = dto.Rating,
                    Comment = dto.Comment,
                    CreatedAt = DateTime.Now
                };

                context.Feedbacks.Add(feedback);
                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error saving feedback: " + ex.Message);
                return false;
            }
        }

        #endregion


    }
}
