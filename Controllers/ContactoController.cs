using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoCRUDV2.Models;

namespace ProyectoCRUDV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly OtraDBEmpleadosContext _dbcontext;

        public ContactoController(OtraDBEmpleadosContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Contacto> lista = await _dbcontext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Contacto request)
        {
            await _dbcontext.Contactos.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Contacto guardado");
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Contacto request)
        {
            _dbcontext.Contactos.Update(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Contacto editado");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Contacto contacto = _dbcontext.Contactos.Find(id);
            _dbcontext.Contactos.Remove(contacto);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Contacto eliminado");
        }

    }
}
