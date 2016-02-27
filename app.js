jQuery.fn.api_service_metadata = function(){
    // base of all service calls
    var api_base = {
        url: '.././Fuma/services', namespace: 'fuma', representation: 'json'
    };

    // all known implementions
    var registry = {
        masthead: {
            name: "masthead",
            version: "latest"
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
});
