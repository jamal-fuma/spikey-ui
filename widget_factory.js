jQuery.fn.make_widget_factory = function(metadata){
var WidgetFactory =
    $.extend( $({}),
        //  add in our extensions to the proto object
        (function(proto){

        // private: within this closure scope
        var registry = metadata.components;
        var api_base = metadata.api_gw;
        var site_base = api_base.site;
        var cdn_url  = api_base.cdn;

        // resolve component to service url
        function service_url(widget_name){
            var endpoint = [registry[widget_name].version, api_base.representation].join(".")
            var url = [ api_base.url, registry[widget_name].name, api_base.namespace, endpoint].join("/");
            return url;
        }

        // request closure with forwarding handlers
        function request(widget_name) {
            var url = service_url(widget_name);
            console.log(widget_name + " : Resolved service url as '" + url + "'");

            var req = {
                type: "GET",
                url: url,
                dataType: 'JSON',

                // log an forward on success
                success: function(resp) {
                    console.log(widget_name +
                                " : Loaded '" + resp.version + "' format '" + resp.representation + "'");

                    // trigger custom event
                    $(document).trigger(widget_name + ".data.load.done",[resp]);
                },

                // log and forward on error
                error: function(error) {
                    console.log(widget_name +
                                " : Loading failed");

                    // trigger custom event
                    $(document).trigger(widget_name + ".data.load.fail",[error]);
                }
            };
            return req;
        };

        // hand out concrete instances with handlers and preconfigured requests
        proto.build = function(name){
            console.log("WidgetFactory::build()");
            return $.extend($({}),(function(o) {
                var css_selector = "#" + name;
                var api_request  = request(name);
                console.log("WidgetFactory::build()::extend(" + css_selector + ")");

                o.request = function(){
                    console.log("WidgetFactory::build()::extend(" + css_selector + ") with request()");
                    return api_request;
                };
                o.future_value = function(){
                    console.log("WidgetFactory::build()::extend(" + css_selector + ") with future_value()");
                    return $.ajax(api_request);
                };
                o.service_url = function(){
                    console.log("WidgetFactory::build()::extend(" + css_selector + ") with service_url()");
                    return service_url(name);
                };
                o.widget_name = function(){
                    console.log("WidgetFactory::build()::extend(" + css_selector + ") with widget_name()");
                    return name;
                };

                // server sent 200 response
                $(document).on(name + ".data.load.done", function(e,resp){
                    console.log("WidgetFactory::build()::extend(" + css_selector + ") with data.load.done handler('" + resp + "')");
                    $(css_selector).data("latest",resp.payload);
                    $(css_selector).html( $(css_selector).data("latest"));
                    // fixup relative image srcs to point at cdn
                    $(css_selector + ' img').attr('src', function(index, src) {
                        return (src.charAt(0) != '/') ? src : cdn_url + src;
                    });
                    // fixup relative url to point at site
                    $(css_selector + ' a').attr('href', function(index, href) {
                        return (href.charAt(0) != '/') ? href : site_base + href;
                    });
                });
                // server sent 403 response
                $(document).on(name + ".data.load.fail", function(e,resp){
                    console.log("WidgetFactory::build()::extend(" + css_selector + ") with data.load.fail handler()");
                    $(css_selector).data("latest","<p>" + name + " failed to load</p>");
                    $(css_selector).html( $(css_selector).data("latest"));
                });

                return o;
            })($({
            })));
        };

        return proto;
        })($({
})));
// end of the slightly mental way of defining a singleton class

    return WidgetFactory;
};
