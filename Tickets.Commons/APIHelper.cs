using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace Tickets.Commons
{
    public static class APIHelper
    {
        public static  HttpClient ApiClient { get; set; }

        //public static void InitializeClient()
        //{
        //    ApiClient = new HttpClient();
        //    ApiClient.DefaultRequestHeaders.Accept.Clear();
        //    ApiClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //}

        static APIHelper()
        {
            ApiClient = new HttpClient();
            ApiClient.DefaultRequestHeaders.Accept.Clear();
            ApiClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
    }
}
