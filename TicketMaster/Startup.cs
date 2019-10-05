using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Serialization;
using Tickets.Bll.HttpService;
using Tickets.Commons;
using Tickets.Commons.Environment;
using Tickets.Entities.Http;

namespace TicketMaster
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public GlobalSettings GlobalSettings;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();

            services.AddAntiforgery(opts =>
            {
                opts.FormFieldName = "AntiForgery.Contracts";
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.None;
            });

            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                // Set a short timeout for easy testing.
                options.IdleTimeout = TimeSpan.FromDays(1);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            var globalSettings = services.Configure<GlobalSettings>(Configuration.GetSection("GlobalSettings"));

            services.AddMvc(options =>
                {
                    //options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
                    options.CacheProfiles.Add("DefaultNoCacheProfile",
                        new CacheProfile()
                        {
                            NoStore = true,
                            Location = ResponseCacheLocation.None
                        });
                    options.Filters.Add(new ResponseCacheAttribute
                    {
                        CacheProfileName = "DefaultNoCacheProfile"
                    });

                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.Configure<FormOptions>(options =>
            {
                options.ValueCountLimit = int.MaxValue;
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            /* if (env.IsDevelopment())
             {
                 app.UseDeveloperExceptionPage();
             }

             app.Run(async (context) =>
             {
                 await context.Response.WriteAsync("Hello World!");
             });*/

            BaseService.Register(app.ApplicationServices);
            HttpServiceContext.Register(app.ApplicationServices);
            Env.Register(env);

            app.UseHttpsRedirection();

            app.UseDeveloperExceptionPage();

            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = (context) =>
                {
                    var headers = context.Context.Response.GetTypedHeaders();
                    headers.CacheControl = new CacheControlHeaderValue()
                    {
                        MaxAge = TimeSpan.FromDays(1)
                    };
                }
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "Default", "{controller}/{action}/{id?}",
                    new { controller = "Home", action = "Index" });
            });
        }
    }
}
