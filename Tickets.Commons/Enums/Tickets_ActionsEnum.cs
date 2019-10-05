using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Tickets.Commons.Enums
{
    public enum Tickets_ActionsEnum : int
    {
        [Description("/discovery/v2/suggest.json")]
        Suggest,
        [Description("/discovery/v2/attractions.json")]
        Attractions,
        [Description("/discovery/v2/classifications.json")]
        Clasifications,
        [Description("/discovery/v2/classifications/genres.json")]
        ClasificationsGenres,
        [Description("/discovery/v2/classifications/segments.json")]
        ClasificationsSegments,
        [Description("/discovery/v2/classifications/subgenres.json")]
        ClasificationsSubgenres,
        [Description("/discovery/v2/events.json")]
        Events,
        [Description("/discovery/v2/venues.json")]
        Venues

    }
}
