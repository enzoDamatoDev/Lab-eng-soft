using Microsoft.AspNetCore.Mvc;
using TempMotoWeb.Data;
using TempMotoWeb.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TempMotoWeb.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class MedicoesController : ControllerBase
    {
        private readonly TempMotoWebContext _context;

        public MedicoesController(TempMotoWebContext context)
        {
            _context = context;
        }
        // GET: api/<ApiController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ApiController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ApiController>
        [HttpPost]
        public IResult Post(Medicao medicao)
        {

            _context.Medicao.Add(medicao);
            _context.SaveChanges();

            return Results.Created($"/medicao/{medicao.Id}", medicao);
        }

        // PUT api/<ApiController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ApiController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
