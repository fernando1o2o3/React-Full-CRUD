using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APINotas.Models
{
    public class Nota
    {
        [Key]
        public int id { get; set; }
        public string titulo { get; set; }
        public string descripcion { get; set; }
    
    }
}
