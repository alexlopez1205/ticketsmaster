using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Tickets.Commons;
using Microsoft.Extensions.Options;

namespace Tickets.Bll.HttpService
{
    public class BaseService
    {
        public static IHttpContextAccessor _accessor;
        public static IServiceProvider _service;
        public static IOptions<GlobalSettings> _global;

        public static IHttpContextAccessor Accessor()
        {
            return _accessor;
        }
        public static void Register(IServiceProvider service)
        {
            _service = service;
            _accessor = service.GetRequiredService<IHttpContextAccessor>();
        }

        public static GlobalSettings Global()
        {
            _global = _accessor.HttpContext.RequestServices.GetRequiredService<IOptions<GlobalSettings>>();
            return (GlobalSettings)_global.Value;
        }
    }
}
