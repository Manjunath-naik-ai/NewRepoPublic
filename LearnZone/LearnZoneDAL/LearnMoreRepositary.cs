using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LearnZoneDAL.Interfaces;
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
        public Iuser Login(string username, string password)
        {
            Iuser  user = null;
            try
            {
                var result = context.Users
                    .FirstOrDefault(u => u.Email == username && u.PasswordHash == password);

                if (result != null)
                {
                    user = new Iuser
                    {
                        Id = result.UserId,
                        Name = result.Name,
                        Email = result.Email,
                        Role = result.Role
                    };
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                user = new Iuser
                {
                    Id = 0,
                    Name = null,
                    Email = "",
                    Role = ""
                };
            }

                return user;
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

        #region  viewAllUser
        public List<User> GetAllUsers()
        {
            List<User> users = new List<User>();
            try
            {
               users = context.Users
                    .Where(u => u.Role == "User")
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving users: " + ex.Message);
                users = null;
            }
            return users;
        }


        #endregion

        #region  viewAllinstructor

        public List<User> GetAllInstructors()
        {
            List<User> users = new List<User>();
            try
            {
                users = context.Users
                     .Where(u => u.Role == "instructor")
                     .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving users: " + ex.Message);
                users = null;
            }
            return users;
        }

        #endregion

        #region ViewAllFeedBacks
        public List<Feedback> ViewAllFeedback()
        {
            List<Feedback> feedbacks = new List<Feedback>();
            try
            {
                feedbacks = context.Feedbacks
                    .Include(f => f.User)
                    .Include(f => f.Course)
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving feedbacks: " + ex.Message);
                feedbacks = null;
            }
            return feedbacks;
        }

        #endregion'

        #region NumberOfEnrollments

        public int GetEnrollmentCount(int courseId)
        {
            try
            {
                return context.Enrollments.Count(e => e.CourseId == courseId);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving enrollment count: " + ex.Message);
                return 0;
            }
        }
        #endregion

        #region AddCourse
        public int AddCourse(Course course)
        {
            Course crs = new Course();
            try
            {
                crs.Title = course.Title;
                crs.Description = course.Description;
                crs.InstructorId = course.InstructorId;

                context.Courses.Add(crs);
                context.SaveChanges();
                return crs.CourseId;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding course: " + ex.Message);
                return 0;
            }
        }


        #endregion

        //-------------------------------------------
        // user dashboard methods
        #region 
        public List<Course> GetallCourses()
        {
            List<Course> courses = new List<Course>();
            try
            {
                courses = context.Courses.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving courses: " + ex.Message);
                courses = null;
            }
            return courses;

        }

        #endregion

        #region EnrollCourse

        public bool EnrollCourse(int userId, int courseId)
        {
            try
            {
                // Check if user and course exist
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
                Console.WriteLine("Error enrolling in course: " + ex.Message);
                return false;
            }
        }
        #endregion


        #region ViewChaptersByCourseId(int courseId){
        public List<Chapter> ViewChaptersByCourseId(int courseId)
        {
            List<Chapter> chapters = new List<Chapter>();
            try
            {
                chapters = context.Chapters
                    .Where(c => c.CourseId == courseId)
                    .OrderBy(c => c.Order)
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving chapters: " + ex.Message);
                chapters = null;
            }
            return chapters;
        }
        #endregion
    }
}

