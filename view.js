// load the masthead service
jQuery.fn.api_masthead_latest = function (css_selector) {
    return $(this).api_bound_to_service_url('Masthead',
                                            '#masthead',
                                            '.././Fuma/services/masthead/fuma/latest.json');
};

// load the footer service
jQuery.fn.api_footer_latest = function () {
    return $(this).api_bound_to_service_url('Footer',
                                            '#footer',
                                            '.././Fuma/services/footer/fuma/latest.json');
};

// populate a widget using html from a service layer
jQuery.fn.api_bound_to_service_url = function (widget_name,css_selector, service_url){
    var req = {}
    req.type                = "GET";
    req.url                 = service_url;
    req.dataType = 'JSON';

    req.success = function(resp) {
        console.log(widget_name + " : Loaded '" + resp.version + "' format '" + resp.representation + "'");

        // fix up image paths
        html_text = resp.payload.replace("'/images","'http://www.fumasoftware.co.uk/images")

        // update DOM
        $(css_selector).html(html_text);

        console.log(widget_name + " : Rendered with css_selector '" + css_selector + "'");
    };

    req.error = function(error) {
        console.log(widget_name + " : Loading failed");
        console.log(error);
    };

    return req;
};

jQuery.fn.hash_to_list_of_tag = function(tagname,hash) {
     var items = [];
     $.each( hash, function( key, val ) {
             items.push( "<" + tagname + " id='" + key + "'>" + val + "</" + tagname + ">" );
     });
     return items;
};

jQuery.fn.hash_to_ecapulated_list_of_tag = function(parent,tagname,hash) {
     var element = $( "<" + parent + "/>", {
          "class": "my-new-list",
              html: $(this).hash_to_list_of_tag(tagname,hash).join( "" )
     });
     return element;
};

