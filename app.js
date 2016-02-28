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

    var menubar = {
        nav: [ { name: 'fs-inline-list-left',
                 root: {
                 }
               },
               { name: 'fs-inline-list-right',
                 root: {
                 },
               } ]
    };

    $(document).on("masthead.data.load.done",function(e,resp){
        $.each(menubar.nav,function(){
            var list_config  = this;
            var list_element = $(list_config.name);

            console.log("Config for list: " + list_config.name);
            console.log("list: " + list_element.html());
        });

        // add css to left navbar
        var left_nav = $(' .fs-inline-list-left');
        left_nav.addClass('col-xs-12 col-sm-10 col-md-10 col-lg-10');
        left_nav.find('li').each(function(){
            var el = $(this);
            el.addClass('col-xs-12 col-sm-2 col-md-2 col-lg-2');
            el.find('a').each(function(){
                var link = $(this);
                link.addClass('Wt-ip');
            });
        });

        // add css to right navbar
        var right_nav = $(' .fs-inline-list-right');
        right_nav.addClass('col-xs-12 col-sm-2 col-md-2 col-lg-2');
        $.each(right_nav.find('li'), function(index,el){
            el.addClass('col-xs-12 col-sm-2 col-md-2 col-lg-2');
            el.find('a').addClass('Wt-ip');
        });
    });
});
