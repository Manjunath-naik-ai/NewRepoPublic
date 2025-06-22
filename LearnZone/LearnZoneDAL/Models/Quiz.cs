using System;
using System.Collections.Generic;

namespace LearnZoneDAL.Models;

public partial class Quiz
{
    public int QuizId { get; set; }

    public int? CourseId { get; set; }

    public string? Title { get; set; }

    public virtual Course? Course { get; set; }

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}
