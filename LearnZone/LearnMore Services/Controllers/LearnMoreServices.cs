using Microsoft.AspNetCore.Mvc;
using LearnZoneDAL;
using System.Runtime.CompilerServices;
using LearnZoneDAL.Interfaces;
using LearnZoneDAL.Models;

namespace LearnMore_Services.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LearnMoreServices : ControllerBase

    {
        LearnMoreRepositary repositary;
        public LearnMoreServices(LearnMoreRepositary repositary)
        {
            this.repositary = repositary;


        }
        #region  login
        [HttpGet("Login")]
        public Iuser Login(String username, string password)
        {
            Iuser iuser = null;
            try
            {

                iuser = repositary.Login(username, password);
            }
            catch (Exception e)
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

        #region ViewAllCourse


        [HttpGet("ViewAllCourse")]

        public List<Course> ViewAllCourse()
        {
            List<Course> courses = null;
            try
            {
                courses = repositary.viewAllCoourse();
            }
            catch (Exception)
            {
                courses = null;
            }
            return courses;
        }
        #endregion

        #region ViewAlluser
        [HttpGet("ViewAlluser")]
        public List<User> ViewAlluser()
        {
            List<User> users = null;
            try
            {
                users = repositary.GetAllUsers();
            }
            catch (Exception)
            {
                users = null;
            }
            return users;
        }

        #endregion

        #region ViewAllInstructor
        [HttpGet("ViewAllInstructor")]
        public List<User> ViewAllInstructor()
        {
            List<User> instructors = null;
            try
            {
                instructors = repositary.GetAllInstructors();
            }
            catch (Exception)
            {
                instructors = null;
            }
            return instructors;
        }

        #endregion

        #region ViewAllFeedBack
        [HttpGet("ViewAllFeedBack")]
        public List<Feedback> ViewAllFeedBack()
        {
            List<Feedback> feedbacks = null;
            try
            {
                feedbacks = repositary.ViewAllFeedback();
            }
            catch (Exception)
            {
                feedbacks = null;
            }
            return feedbacks;
        }
        #endregion

        #region NoOfEnrollments
        [HttpGet("NoOfEnrollments")]
        public int NoOfEnrollments(int courseId)
        {
            int count = 0;
            try
            {
                count = repositary.GetEnrollmentCount(courseId);
            }
            catch (Exception)
            {
                count = 0;
            }
            return count;
        }

        #endregion

        #region AddCourse
        [HttpPost("AddCourse")]
        public int AddCourse(string title, string description, int instructorId)
        {
            int result = 0;
            try
            {
                result = repositary.AddCourse(title, description, instructorId);
            }
            catch (Exception)
            {
                result = 0;
            }
            return result;
        }
        #endregion
      

    }
}
