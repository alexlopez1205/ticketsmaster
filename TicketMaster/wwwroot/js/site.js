var keyword = "";
var pagination;
var paginationEvents;
var _page = 0;
var _pageEvnts = 0;
var attractionId;

var settings = {
    totalRecords: 0,
    records: [],
    displayRecords: [],
    recPerPage: 20,
    _page: 0,
    totalPages: 1,
    onPageClick: function (event, page) {
        _page = (page - 1);
        fnGetAttractions();
    }
};

var settingsEvents = {
    totalRecords: 0,
    records: [],
    displayRecords: [],
    recPerPage: 20,
    _page: 0,
    totalPages: 1,
    onPageClick: function (event, page) {
        _pageEvnts = (page - 1);
        fnGetEvents(attractionId);
    }
}


$(document).ready(function () {
    fnGetAttractions(); 
    ShowIntro();
});

$(document).on("click", ".clsAttraction", function (e) {
    attractionId = $(this).data("attractionid");
    _pageEvnts = 0;
    if (paginationEvents != null) {
        paginationEvents.twbsPagination('destroy');
    }
    fnGetEvents(attractionId);
});

$(document).on('click', '#idBtnSearch', function (e) {
   e.preventDefault();
   _page = 0;
    keyword = $("#idTxtSearch").val();
    if (keyword != "") {
        if (pagination != null) {
            pagination.twbsPagination('destroy');
        }
        fnGetAttractions(); 
    }
});

$("#idBtnClear").on("click", function () {
    $("#idTxtSearch").val("");
    $("#idDivEvents").empty();
    _page = 0;
    _pageEvnts = 0;
    pagination.twbsPagination('destroy');
    $("#paginateBox").empty();
    $("#paginateBox").html('<ul class="pagination pagination - sm" id="pagination"></ul><ul class="pagination pagination - sm" id="paginationEvents" style="display: none;"></ul>');
});

function apply_pagination() {
    
        pagination = $("#pagination").twbsPagination($.extend({},
            settings,
            {
                totalRecords: ttalrecords,
                totalPages: ttalpages
            }));
    
    $("#pagination").show();
    $("#paginationEvents").hide();
}

function apply_pagination_events() {
    paginationevents = $("#paginationEvents").twbsPagination($.extend({},
        settingsEvents,
        {
            totalRecords: ttalrecords,
            totalPages: ttalpages
        }));

    $("#paginationEvents").show();
    $("#pagination").hide();
}


function fnGetAttractions() {
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=" + keyword + "&page="+_page+"&apikey=wiZS4yVhAOAmoFsAAYcq46J1kpiozaXT",
        async: false,
        dataType: "json",
        success: function (json) {
            cbSuccessLoadAttractions(json);
        }
    });
}


function cbSuccessLoadAttractions(result) {
    var page;
    var events;
    if (result != undefined) {
        if (result._embedded != undefined) {
            page = result.page;
            $.each(result._embedded,
                function (i, v) {
                    events = v;
                });

            var ttalrecords = page.totalElements;
            var ttalpages = page.totalPages == 0 ? 1 : page.totalPages;

            pagination = $("#pagination").twbsPagination({
                totalRecords: ttalrecords,
                totalPages: ttalpages,
                initiateStartPageClick: false,
                recPerPage: 20,
                onPageClick: function (event, page) {
                    _page = (page - 1);
                    fnGetAttractions();
                }
            });


            $("#pagination").show();
            $("#paginationEvents").hide();


            var array = $.map(events,
                function (value, index) {
                    return [value];
                });

            var attraction = "";
            $("#idDivEvents").empty();
            attraction += '<span class="label label-flat border-success text-success-600">Attractions</span><br/><br/>';

            $.each(events,
                function (i, v) {
                    var attractionId = v.id;
                    var clasifications = v.classifications[0].segment.name;
                    var attractionName = v.name;
                    var attractionimg = v.images[0].url;


                    attraction += '<li class="media panel panel-body stack-media-on-mobile"> ' +
                        ' <div class="media-left"> ' +
                        '<img src="' +
                        attractionimg +
                        '" data-attractionid="' +
                        attractionId +
                        '" class="img-rounded img-lg clsAttraction" alt="">' +
                        '</div>' +
                        '<div class="media-body">' +
                        '<h6 class="media-heading text-semibold">' +
                        '<a href="#" data-attractionid="' +
                        attractionId +
                        '" class="clsAttraction">' +
                        attractionName +
                        '</a>' +
                        '</h6>' +
                        '<ul class="list-inline list-inline-separate text-muted mb-10">' +
                        '<li><a href="#" class="text-muted">' +
                        clasifications +
                        '</a></li>' +
                        '</ul>' +
                        '</div>' +
                        '<div class="media-right text-nowrap">' +
                        '<a class="btn bg-indigo-300 btn-block clsAttraction" data-attractionid="' +
                        attractionId +
                        '">' +
                        ' Find events' +
                        '<i class="icon-point-right text-size-base position-right"></i>' +
                        '</a>' +
                        '</div>' +
                        '</li>';
                });

            $("#idDivEvents").html(attraction);
        } else {
            $("#idDivEvents").empty();
            var alerta =
                '<div class="alert alert-danger alert-bordered">' +
                '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>' +
                '<span class="text-semibold">Sorry</span>, we found no matches for your search.</a>.' +
                '</div>';
            $("#idDivEvents").html(alerta);
        }
    } else {
        $("#idDivEvents").empty();
        var alerta =
            '<div class="alert alert-danger alert-bordered">' +
            '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>' +
            '<span class="text-semibold">Oops!</span> there was an error with the system. Please try again later.</a>.' +
            '</div>';
        $("#idDivEvents").html(alerta);
    }


}

function fnGetEvents(attractionId) {
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?attractionId=" + attractionId + "&page=" + _pageEvnts+"&size="+10+"&apikey=wiZS4yVhAOAmoFsAAYcq46J1kpiozaXT",
        async: false,
        dataType: "json",
        success: function (json) {

            cbSuccessLoadEvents(json);
        }
    });

}

function cbSuccessLoadEvents(result) {
    var page;
    var events;
    if (result != undefined) {
        if (result._embedded != undefined) {


            page = result.page;


            $.each(result._embedded,
                function (i, v) {
                    events = v;
                });

            var ttalrecords = page.totalElements;
            var ttalpages = page.totalPages == 0 ? 1 : page.totalPages;

            paginationEvents = $("#paginationEvents").twbsPagination({
                totalRecords: ttalrecords,
                totalPages: ttalpages,
                initiateStartPageClick: false,
                recPerPage: 20,
                onPageClick: function (event, page) {
                    _pageEvnts = (page - 1);
                    fnGetEvents(attractionId);
                }
            });

            $("#paginationEvents").show();
            $("#pagination").hide();

            var array = $.map(events,
                function (value, index) {
                    return [value];
                });

            var evento = "";
            $("#idDivEvents").empty();

            var alerta =
                '<div class="alert alert-success alert-bordered">' +
                '<span class="text-semibold">Success!</span> Here you have your search results.' +
                '</div >';
            $("#idDivEvents").html(alerta);

            evento += alerta;
            evento += '<span class="label label-flat border-success text-success-600">Events</span><br/><br/>';
            $.each(events,
                function (i, v) {
                    var venues = v._embedded != null ? v._embedded.venues : "";

                    var eventId = v.id;
                    var clasifications = v.classifications;
                    var segmento = clasifications.length > 0 ? clasifications[0].segment.name : "";
                    var eventDate = v.dates != null ? v.dates.start.localDate : "";
                    var eventTime = v.dates != null
                        ? v.dates.start.localTime != undefined
                            ? v.dates.start.localTime
                            : ""
                        : "";
                    var eventTimeZone = v.dates != null ? v.dates.timezone : "";
                    var venueslist = "";
                    if (venues != undefined) {
                        $.each(venues,
                            function (i, v) {
                                venueslist += '<li><i class="icon-earth"></i>&nbsp;<label class="text-muted"> ' +
                                    v.name +
                                    '</label></li>' +
                                    '<li>' +
                                    (v.city != undefined ? v.city.name : "") +
                                    ", " +
                                    (v.state != undefined ? v.state.name : "") +
                                    '.</li><br/>';
                            });
                    }

                    var eventimg = v.images[0].url;

                    evento += '<li class="media panel panel-body stack-media-on-mobile"> ' +
                        ' <div class="media-left"> ' +
                        '<a href="' +
                        v.url +
                        '" target="_blank">' +
                        '<img src="' +
                        eventimg +
                        '" class="img-rounded img-lg" alt="">' +
                        '</a>' +
                        '</div>' +
                        '<div class="media-body">' +
                        '<h6 class="media-heading text-semibold">' +
                        '<a href="' +
                        v.url +
                        '" target="_blank" id="' +
                        eventId +
                        '" class="clsEvent">' +
                        v.name +
                        '</a>' +
                        '</h6>' +
                        '<ul class="list-inline list-inline-separate text-muted mb-10">' +


                        '-' +
                        eventTime +
                        (eventTimeZone != undefined ? '<li>' + eventDate + '(' + eventTimeZone + ')</li><br/>' : "<li>" + eventDate + "</li><br/>)") +
                        '<li><strong>Venue info</strong></li><br/>'+
                        venueslist +
                        '</ul>' +
                        '</div>' +
                        '<div class="media-right text-nowrap" style="text-align:center">' +
                        '<span class="label bg-blue">' +
                        segmento +
                        '</span><br/><br/>' +
                        '<a href="' +
                        v.url +
                        '" target="_blank"><span class="label bg-indigo-300 clsEvent">' +
                        ' Tickets' +
                        '<i class="icon-ticket text-size-base position-right"></i>' +
                        '</span></a>' +
                        '</div >' +
                        '</li>';
                });


            '<div class="media-right text-nowrap">' +
                '</div>' +
                $("#idDivEvents").html(evento);
        } else {
            $("#idDivEvents").empty();
            var alerta =
                '<div class="alert alert-danger alert-bordered">' +
                '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>' +
                '<span class="text-semibold">Sorry</span>, we found no events for your selection.</a>.' +
                '</div>';
            $("#idDivEvents").html(alerta);
        }
    } else {
        $("#idDivEvents").empty();
        var alerta =
            '<div class="alert alert-danger alert-bordered">' +
            '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>' +
            '<span class="text-semibold">Oops!</span> there was an error with the system. Please try again later.</a>.' +
            '</div>';
        $("#idDivEvents").html(alerta);
    }

}

