import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5096/api/employees';

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', cargo: '', salario: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Cargar empleados cuando inicia la app
  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const respuesta = await axios.get(API_URL);
      setEmpleados(respuesta.data);
    } catch (error) {
      console.error('Error cargando empleados:', error);
      alert('Error al cargar los empleados');
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!formulario.nombre.trim() || !formulario.cargo.trim()) {
      alert('El nombre y el cargo son obligatorios');
      return;
    }
    
    if (formulario.salario <= 0) {
      alert('El salario debe ser mayor a 0');
      return;
    }

    setCargando(true);
    try {
      if (editandoId) {
        // Actualizar empleado existente
        await axios.put(`${API_URL}/${editandoId}`, {
          name: formulario.nombre,
          position: formulario.cargo,
          salary: parseFloat(formulario.salario)
        });
        alert('Empleado actualizado correctamente');
      } else {
        // Crear nuevo empleado
        await axios.post(API_URL, {
          name: formulario.nombre,
          position: formulario.cargo,
          salary: parseFloat(formulario.salario)
        });
        alert('Empleado creado correctamente');
      }
      
      reiniciarFormulario();
      cargarEmpleados(); // Recargar la lista
    } catch (error) {
      alert(`Error ${editandoId ? 'actualizando' : 'creando'} el empleado`);
    } finally {
      setCargando(false);
    }
  };

  const manejarEdicion = (empleado) => {
    setFormulario({
      nombre: empleado.name,
      cargo: empleado.position,
      salario: empleado.salary
    });
    setEditandoId(empleado.id);
  };

  const manejarEliminacion = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Empleado eliminado correctamente');
      cargarEmpleados();
    } catch (error) {
      alert('Error eliminando el empleado');
    }
  };

  const reiniciarFormulario = () => {
    setFormulario({ nombre: '', cargo: '', salario: '' });
    setEditandoId(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Gestión de Empleados</h1>
      </header>

      <div className="container">
        {/* Sección del Formulario */}
        <div className="form-section">
          <h2>{editandoId ? '✏️ Editar Empleado' : '➕ Agregar Nuevo Empleado'}</h2>
          <form onSubmit={manejarEnvio}>
            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                value={formulario.nombre}
                onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
                placeholder="Ingresa el nombre del empleado"
                required
              />
            </div>

            <div className="form-group">
              <label>Cargo *</label>
              <input
                type="text"
                value={formulario.cargo}
                onChange={(e) => setFormulario({...formulario, cargo: e.target.value})}
                placeholder="Ingresa el cargo"
                required
              />
            </div>

            <div className="form-group">
              <label>Salario *</label>
              <input
                type="number"
                value={formulario.salario}
                onChange={(e) => setFormulario({...formulario, salario: e.target.value})}
                placeholder="Ingresa el salario"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" disabled={cargando}>
                {cargando ? 'Guardando...' : (editandoId ? 'Actualizar Empleado' : 'Crear Empleado')}
              </button>
              {editandoId && (
                <button type="button" onClick={reiniciarFormulario} className="cancel-btn">
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Sección de Lista */}
        <div className="list-section">
          <h2>👥 Empleados ({empleados.length})</h2>
          
          {empleados.length === 0 ? (
            <div className="empty-state">
              <p>No hay empleados registrados. ¡Agrega el primero!</p>
            </div>
          ) : (
            <div className="employee-grid">
              {empleados.map(empleado => (
                <div key={empleado.id} className="employee-card">
                  <div className="employee-info">
                    <h3>{empleado.name}</h3>
                    <p><strong>Cargo:</strong> {empleado.position}</p>
                    <p><strong>Salario:</strong> ${empleado.salary.toLocaleString()}</p>
                    <p><strong>ID:</strong> {empleado.id}</p>
                  </div>
                  <div className="employee-actions">
                    <button 
                      onClick={() => manejarEdicion(empleado)}
                      className="edit-btn"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => manejarEliminacion(empleado.id)}
                      className="delete-btn"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="app-footer">
        
      </footer>
    </div>
  );
}

export default App;