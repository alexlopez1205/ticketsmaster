using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Tickets.Bll.BaseBll;
using Tickets.Commons;
using Tickets.Commons.Enums;
using Tickets.Commons.Extensions;
using Tickets.Models.Tickets;

namespace Tickets.Bll.Tickets
{
    public class TicketBll : BaseBusinessLogic
    {
        public async Task<ResponseDto> GetTicketsList(string attractionId, int pageNo)
        {
            _embedded emb = new _embedded();
            ResponseDto rrr;
            string tresponse = "";
            TicketDto events = new TicketDto();
            PageDto pagina = new PageDto();
            EventsDto eventos;
            string url =$"{_global.UrlAPI}{(Tickets_ActionsEnum.Events).GetEnumDescription()}?&page={pageNo}&attractionId={attractionId}&apikey={_global.APIKey}";
            try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var resp = await response.Content.ReadAsStringAsync();
                        rrr = JsonConvert.DeserializeObject<ResponseDto>(resp);
                    }
                    else
                    {
                        tresponse = "";
                        throw new Exception(response.ReasonPhrase);
                    }
                }

            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return null;
            }

            return rrr;
        }

        public async Task<ResponseDto> GetAttractionsList(int pageNo, string keyword)
        {
            _embedded emb = new _embedded();
            ResponseDto rrr;
            string tresponse = "";
            TicketDto events = new TicketDto();
            PageDto pagina = new PageDto();
            EventsDto eventos;
            string url =$"{_global.UrlAPI}{(Tickets_ActionsEnum.Attractions).GetEnumDescription()}?&keyword={keyword}&page={pageNo}&apikey={_global.APIKey}";
           try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var resp = await response.Content.ReadAsStringAsync();
                        rrr = JsonConvert.DeserializeObject<ResponseDto>(resp);
                    }
                    else
                    {
                        tresponse = "";
                        throw new Exception(response.ReasonPhrase);
                    }
                }

            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return null;
            }

            return rrr;
        }
    }
}
