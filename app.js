jQuery.fn.api_service_metadata = function(){
    // base of all service calls
    var api_base = {
        url: '.././Fuma/services', namespace: 'fuma', representation: 'json',
        cdn: 'http://www.fumasoftware.co.uk',
        site: '/api/ui'
    };

    // all known implementions
    var registry = {
        masthead: {
            name: "masthead",
            version: "dev"
        },
        footer: {
            name: "footer",
            version: "latest"
        }
    };
    console.log("api_service_metadata()");
    return {api_gw: api_base, components: registry};
};

// setup application globals
var app_config = $(this).api_service_metadata();
var PageView = $(this).make_page_view(app_config);

// bind on load
$(document).ready(function(){
    PageView.setup();
    PageView.reload();

    $(document).on("masthead.data.load.done",function(e,resp){
        // add css to left navbar
        var left_nav = $(' .fs-inline-list-left');
        left_nav.addClass('col-xs-12 col-sm-10 col-md-10 col-lg-10');
        $.each(left_nav.find('li'), function(el){
            el.addClass('col-xs-12 col-sm-2 col-md-2 col-lg-2');
            el.find('a').addClass('Wt-ip');
            el.s
        });

        // add css to right navbar
        var right_nav = $(' .fs-inline-list-right');
        right_nav.addClass('col-xs-12 col-sm-2 col-md-2 col-lg-2');
        $.each(right_nav.find('li'), function(el){
            el.addClass('col-xs-12 col-sm-2 col-md-2 col-lg-2');
            el.find('a').addClass('Wt-ip');
        });
    });
});
