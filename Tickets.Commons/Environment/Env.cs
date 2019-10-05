using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Hosting;

namespace Tickets.Commons.Environment
{
    public static class Env
    {
        //private static IHostingEnvironment _env;

        public static void Register(IHostingEnvironment env)
        {
            //_env = env;
        }

        public static IHostingEnvironment Environment()
        {
            //return _env;
            return null;
        }
    }
}
