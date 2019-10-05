using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Tickets.Entities.Http
{
    public static class HttpServiceContext
    {
        public static IHttpContextAccessor _accessor;

        public static void Register(IServiceProvider service)
        {
            _accessor = service.GetRequiredService<IHttpContextAccessor>();

        }

        public static IHttpContextAccessor Accessor()
        {
            return _accessor;
        }
    }
}
