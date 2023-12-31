﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using NuGet.Protocol;
using System.Globalization;
using System.Net.Http.Headers;
using TempMotoWeb.Data;
using TempMotoWeb.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
        public async Task<IResult> Post(Medicao medicao)
        {
            try
            {
                string url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + medicao.Latitude.ToString().Replace(',', '.') + "," + medicao.Longitude.ToString().Replace(',', '.') + "&result_type=street_address|country&key=" + Environment.GetEnvironmentVariable("apiKey");
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync("");
                Console.WriteLine(response);
                if (response.IsSuccessStatusCode)
                {
                    var resp = JObject.Parse(response.Content.ReadAsStringAsync().Result);
                    try
                    {
                        medicao.endereco = (resp["results"][0]["formatted_address"].ToString());
                    }
                    catch (Exception e)
                    {
                        medicao.endereco = null;
                    }
                }
                else
                {
                    return Results.Problem("endereço não localizado");
                }


                _context.Medicao.Add(medicao);
                await _context.SaveChangesAsync();

                return Results.Created($"/medicao/{medicao.Id}", medicao);
            }catch(Exception e)
            {
                return Results.Problem(e.Message+e.StackTrace);
            }
        }

        [HttpGet("mapa")]
        public async Task<List<Medicao>> Mapa([FromQuery]int[] itens)
        {
            var list = await _context.Medicao
                .Where(x => itens.Contains(x.Id))
                .ToListAsync();

            /*foreach(var it in list)
            {
                it.Data_Medicao = DateTime.Parse(it.Data_Medicao.ToString(), new CultureInfo("pt-BR"));
            }*/

            return list;
        }

        [HttpGet("grafico")]
        public async Task<List<Medicao>> Grafico([FromQuery] DateTime dataInicio, [FromQuery] DateTime dataFim)
        {
            var list = await _context.Medicao
                .Where(x => x.Data_Medicao>dataInicio && x.Data_Medicao < dataFim)
                .ToListAsync();

            /*foreach(var it in list)
            {
                it.Data_Medicao = DateTime.Parse(it.Data_Medicao.ToString(), new CultureInfo("pt-BR"));
            }*/

            return list;
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
