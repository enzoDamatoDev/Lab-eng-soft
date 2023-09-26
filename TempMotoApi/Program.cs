
using Microsoft.EntityFrameworkCore;
using TempMotoWeb.Data;
using TempMotoWeb.Models;
using TempMotoWeb;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TempMotoWebContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TempMotoWebContext") ?? throw new InvalidOperationException("Connection string 'TempMotoWebContext' not found.")));

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.MapPost("/medicao/new", async (Medicao medicao, TempMotoWebContext db ) =>
{
    db.Medicao.Add(medicao);
    await db.SaveChangesAsync();

    return Results.Created($"/medicao/{medicao.Id}", medicao);
});

app.Run();
