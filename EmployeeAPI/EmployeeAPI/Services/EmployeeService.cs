using EmployeeAPI.Data;
using EmployeeAPI.DTOs;
using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Services;

public class EmployeeService
{
    private readonly AppDbContext _context;

    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<EmployeeDto>> GetEmployees()
    {
        return await _context.Employees
            .Select(e => new EmployeeDto
            {
                Id = e.Id,
                Name = e.Name,
                Position = e.Position,
                Salary = e.Salary
            })
            .ToListAsync();
    }

    public async Task<EmployeeDto?> GetEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return null;

        return new EmployeeDto
        {
            Id = employee.Id,
            Name = employee.Name,
            Position = employee.Position,
            Salary = employee.Salary
        };
    }

    public async Task<EmployeeDto> CreateEmployee(CreateEmployeeDto dto)
    {
        var employee = new Employee
        {
            Name = dto.Name,
            Position = dto.Position,
            Salary = dto.Salary
        };

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return new EmployeeDto
        {
            Id = employee.Id,
            Name = employee.Name,
            Position = employee.Position,
            Salary = employee.Salary
        };
    }

    public async Task<bool> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return false;

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<EmployeeDto?> UpdateEmployee(int id, CreateEmployeeDto dto)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return null;

        employee.Name = dto.Name;
        employee.Position = dto.Position;
        employee.Salary = dto.Salary;

        await _context.SaveChangesAsync();

        return new EmployeeDto
        {
            Id = employee.Id,
            Name = employee.Name,
            Position = employee.Position,
            Salary = employee.Salary
        };
    }
}