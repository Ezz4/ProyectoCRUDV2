using System;
using System.Collections.Generic;

namespace ProyectoCRUDV2.Models
{
    public partial class Empleado
    {
        public int IdEmpleado { get; set; }
        public string? Nombre { get; set; }
        public string? Correo { get; set; }
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
    }
}
