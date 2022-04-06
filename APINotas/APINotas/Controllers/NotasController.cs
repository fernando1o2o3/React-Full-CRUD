using APINotas.Context;
using APINotas.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APINotas.Controllers
{
    [Route("api/notas")]
    [ApiController]
    public class NotasController : ControllerBase
    {
        private readonly Contexto context;

        public NotasController(Contexto context)
        {
            this.context = context;
        }

        // GET: api/<NotasController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.notas.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<NotasController>/5
        [HttpGet("{id}", Name = "GetGestor")]
        public ActionResult Get(int id)
        {
            try
            {
                return Ok(context.notas.FirstOrDefault(x=>x.id == id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<NotasController>
        [HttpPost]
        public ActionResult Post([FromBody] Nota modelo)
        {
            try
            {
                context.notas.Add(modelo);
                context.SaveChanges();
                return CreatedAtRoute("GetGestor", new { id=modelo.id }, modelo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<NotasController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Nota modelo)
        {
            try
            {
                if (modelo.id == id)
                {
                    context.Entry(modelo).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetGestor", new { id = modelo.id }, modelo);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/<NotasController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var modelo = context.notas.FirstOrDefault(x => x.id == id);

                if (modelo != null)
                {
                    context.notas.Remove(modelo);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
