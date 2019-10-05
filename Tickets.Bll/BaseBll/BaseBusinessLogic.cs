using System;
using System.Collections.Generic;
using System.Text;
using Tickets.Bll.HttpService;
using Tickets.Commons;
using Tickets.Models;

namespace Tickets.Bll.BaseBll
{
    public class BaseBusinessLogic
    {
        public readonly GlobalSettings _global;

        public BaseBusinessLogic()
        {
            _global = BaseService.Global();
        }
    }
}
