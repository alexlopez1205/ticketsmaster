var removeLoad;
var pageLoad;
var notifications;
var ShowNotifications;
var searchNotific;

jQuery.extend({
    highlight: function (node, re, nodeName, className) {
        if (node.nodeType === 3) {
            var match = node.data.match(re);
            if (match) {
                var highlight = document.createElement(nodeName || 'span');
                highlight.className = className || 'bg-danger';
                var wordNode = node.splitText(match.index);
                wordNode.splitText(match[0].length);
                var wordClone = wordNode.cloneNode(true);
                highlight.appendChild(wordClone);
                wordNode.parentNode.replaceChild(highlight, wordNode);
                return 1; //skip added node in parent
            }
        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
            }
        }
        return 0;
    }
});

jQuery.fn.unhighlight = function (options) {
    var settings = { className: 'bg-danger', element: 'span' };
    jQuery.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function () {
        var parent = this.parentNode;
        parent.replaceChild(this.firstChild, this);
        parent.normalize();
    }).end();
};

jQuery.fn.highlight = function (words, options) {
    var settings = { className: 'bg-danger', element: 'span', caseSensitive: false, wordsOnly: false };
    jQuery.extend(settings, options);

    if (words.constructor === String) {
        words = [words];
    }
    words = jQuery.grep(words, function(word, i){
      return word != '';
    });
    words = jQuery.map(words, function(word, i) {
      return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length == 0) { return this; };

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
        pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);

    return this.each(function () {
        jQuery.highlight(this, re, settings.element, settings.className);
    });
};

(function() {
    //Resuelve la URL del sitío.
    window.url = window.location.origin;
    //System.LoadingShow();
    if (!Array.prototype.includes) {
        Array.prototype.includes = function(str) {
            var returnValue = false;

            if (this.indexOf(str) !== -1) {
                returnValue = true;
            }

            return returnValue;
        }
    }

    Array.prototype.pushArray = function(arr) {
        this.push.apply(this, arr);
    };
    //System.GetNotifications();

    pageLoad = function(CustomMessage, ubication) {
        $((ubication == undefined ? 'Body' : ubication)).block({
            message: '<span class="text-semibold">' +
                '<i class="icon-spinner4 spinner position-left"></i>&nbsp; ' +
                (CustomMessage == undefined ? 'Loading...' : CustomMessage) +
                '</span>',
            overlayCSS: {
                backgroundColor: '#1B2024',
                opacity: 0.8,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: '10px 15px',
                color: '#fff',
                width: 'auto',
                '-webkit-border-radius': 2,
                '-moz-border-radius': 2,
                backgroundColor: 'none'
            }
        });
    }

    removeLoad = function(ubication) {
        $((ubication == undefined ? 'Body' : ubication)).unblock();
    }

    notifications = function() {
        $.get(url + 'Commons/Notifications',
            function(result) {
                $("#divNotifications").html(result);
            });
    }

    ShowNotifications = function(access) {
        //debugger;
        $.post(url + 'Commons/ShowNotifications',
            { "access": access },
            function(result) {
                $("#NotificationsModal").html(result);
                notifications();
            });
    }

    searchNotific = function() {
        var input, filter, ul, li, a, i, a2;
        input = document.getElementById("inpNotifications");
        filter = input.value.toUpperCase();
        ul = document.getElementById("ulNotifications");
        li = ul.getElementsByTagName("li");
        $("#ulNotifications li a").unhighlight();
        $("#ulNotifications li a").highlight(filter);
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            a2 = li[i].getElementsByTagName("a")[1];

            if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || a2.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
})();

window.onload = function () {
    //removeLoad();
};