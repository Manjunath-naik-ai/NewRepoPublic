using Microsoft.EntityFrameworkCore;
using LearnZoneDAL;
using LearnZoneDAL.Models;

namespace LearnMore_Services
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();





                    });
            });
            // Add services to the container.
            builder.Services.AddDbContext<LearnZoneContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionStringName")));

            builder.Services.AddScoped<LearnMoreRepositary>();


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
           


            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAllOrigins"); 

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
