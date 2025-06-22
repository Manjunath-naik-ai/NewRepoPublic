using System;
using System.Collections.Generic;

namespace LearnZoneDAL.Models;

public partial class Submission
{
    public int SubmissionId { get; set; }

    public int? UserId { get; set; }

    public int? QuizId { get; set; }

    public double? Score { get; set; }

    public DateTime? SubmittedAt { get; set; }

    public virtual Quiz? Quiz { get; set; }

    public virtual User? User { get; set; }
}
