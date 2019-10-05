using System;
using System.Collections.Generic;
using System.Text;

namespace Tickets.Models.Tickets
{
    public class ResponseDto
    {
        public Object _embedded { get; set; }
        public Object page { get; set; }
    }
}
