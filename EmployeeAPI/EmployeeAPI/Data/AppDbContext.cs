using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace EmployeeAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Employee> Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>().HasData(
            new Employee { Id = 1, Name = "Ana García", Position = "Manager", Salary = 60000 },
            new Employee { Id = 2, Name = "Carlos López", Position = "Developer", Salary = 50000 }
        );
    }
}