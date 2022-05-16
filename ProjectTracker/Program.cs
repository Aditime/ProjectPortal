using ProjectTracker.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options=>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Asp.Net React Project", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions  => {
    swaggerUIOptions.DocumentTitle = "ASP.Net React Project";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving a very simple Post model");
    swaggerUIOptions.RoutePrefix = String.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/get-all-posts", async () => await ProjectTracker.Data.PostRepository.GetPostsAsync()).WithTags("Posts EndPoints");

app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    Post postToReturn = await PostRepository.GetPostByIdAsync(postId);

    if (postToReturn != null)
    {
        return Results.Ok(postToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");


app.MapPost("/create-post", async (Post postToCreate) =>
{
    bool createSuccessful = await PostRepository.CreatePostAsync(postToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Created Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");




app.MapPut("/update-post", async (Post postToUpdate) =>
{
    bool UpdateSuccessful = await PostRepository.UpdatePostAsync(postToUpdate);

    if (UpdateSuccessful)
    {
        return Results.Ok("Updated Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");



app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    bool DeleteSuccessful = await PostRepository.DeletePostAsync(postId);

    if (DeleteSuccessful)
    {
        return Results.Ok("delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");




app.Run();
