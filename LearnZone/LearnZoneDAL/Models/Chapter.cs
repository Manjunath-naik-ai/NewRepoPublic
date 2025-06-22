using System;
using System.Collections.Generic;

namespace LearnZoneDAL.Models;

public partial class Chapter
{
    public int ChapterId { get; set; }

    public int? CourseId { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public int? Order { get; set; }

    public virtual Course? Course { get; set; }
}
