using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LearnZoneDAL.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int? UserId { get; set; }

    public int? CourseId { get; set; }

    public int? Rating { get; set; }

    public string? Comment { get; set; }

    public DateTime? CreatedAt { get; set; }

    [JsonIgnore]
    public virtual Course? Course { get; set; }

    public virtual User? User { get; set; }
}
