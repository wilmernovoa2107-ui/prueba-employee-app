using Microsoft.AspNetCore.Mvc;
using EmployeeAPI.Services;
using EmployeeAPI.DTOs;

namespace EmployeeAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeService _employeeService;

    public EmployeesController(EmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    // GET: api/employees
    [HttpGet]
    public async Task<IActionResult> GetEmployees()
    {
        try
        {
            var employees = await _employeeService.GetEmployees();
            return Ok(employees);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    // GET: api/employees/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(int id)
    {
        try
        {
            var employee = await _employeeService.GetEmployee(id);
            if (employee == null)
                return NotFound($"No se encontró el empleado con ID {id}");

            return Ok(employee);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    // POST: api/employees
    [HttpPost]
    public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto dto)
    {
        try
        {
            // Validaciones
            if (dto.Salary <= 0)
                return BadRequest("El salario debe ser mayor a 0");

            if (string.IsNullOrEmpty(dto.Name) || string.IsNullOrEmpty(dto.Position))
                return BadRequest("El nombre y el cargo son obligatorios");

            var employee = await _employeeService.CreateEmployee(dto);
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    // PUT: api/employees/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody] CreateEmployeeDto dto)
    {
        try
        {
            if (dto.Salary <= 0)
                return BadRequest("El salario debe ser mayor a 0");

            if (string.IsNullOrEmpty(dto.Name) || string.IsNullOrEmpty(dto.Position))
                return BadRequest("El nombre y el cargo son obligatorios");

            var employee = await _employeeService.UpdateEmployee(id, dto);
            if (employee == null)
                return NotFound($"No se encontró el empleado con ID {id}");

            return Ok(employee);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    // DELETE: api/employees/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        try
        {
            var result = await _employeeService.DeleteEmployee(id);
            if (!result)
                return NotFound($"No se encontró el empleado con ID {id}");

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }
}