var AJAX = (function () {
    var set = function (ruta, modelo, cbSuccess, cbError, mthod) {
        $.ajax({
            type: "POST",//(mthod === undefined || mthod == null) ? "POST" : mthod
            async: true,  
            headers: 
                { 'RequestVerificationToken': 
                    $("input[name=__RequestVerificationToken]").val()
                },
            url: ruta
            //,beforeSend: function (xhr) {
            //    xhr.setRequestHeader("XSRF-TOKEN",
            //        $('input:hidden[name="__RequestVerificationToken"]').val());
            //},
            //headers: {
            //    RequestVerificationToken: 
            //        $('input:hidden[name="__RequestVerificationToken"]').val()
            //}
            , data: JSON.stringify(modelo)// modelo !== undefined && modelo !== null && !$.isEmptyObject(modelo) ? JSON.stringify(modelo) : {}
            , contentType: "application/json; charset=utf-8"
            , responseType: "json"
            , dataType: "json"
            , success: cbSuccess
            , error: cbError
        });
    }

    var setDefault = function (ruta, modelo, cbSuccess) {
        $.post(/*window.url +*/ ruta, modelo, cbSuccess);
    }

    return {
        Set: set,
        SetDefault: setDefault
    }
})();