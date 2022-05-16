using System.ComponentModel.DataAnnotations;

namespace ProjectTracker.Data
{
    internal sealed class Post
    {
        [Key]
        public int PostId { get; set; }


        [Required]
        [MaxLength(length: 100)]
        public string PNO { get; set; }


        [Required]
        [MaxLength(length: 100)]
        public string Title { get; set; } = String.Empty;


        [Required]
        [MaxLength(length: 1000000)]
        public string Content { get; set; } = String.Empty;



        [Required]
        [MaxLength(length: 100)]
        public string AssignedTo { get; set; } = String.Empty;

        [Required]
        public string DateCreated { get; set; }


        [Required]
        public string DueDate { get; set; }

        [Required]
        [MaxLength(length: 100)]
        public string ProjectStatus { get; set; }


    }
}
