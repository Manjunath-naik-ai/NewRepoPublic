using System;
using System.Collections.Generic;

namespace LearnZoneDAL.Models;

public partial class Question
{
    public int QuestionId { get; set; }

    public int? QuizId { get; set; }

    public string? Question1 { get; set; }

    public string? Options { get; set; }

    public string? CorrectAns { get; set; }

    public virtual Quiz? Quiz { get; set; }
}
