jQuery.fn.make_page_view = function(metadata){

var PageView =
    $.extend( $({}),
         //  add in our extensions to the proto object
        (function(proto){

        // build components
        var widgets         = {}
        var components      = [];
        var widget_factory  = $(this).make_widget_factory(metadata);

        var registry = metadata.components;

        // public:
        proto.setup = function(){
            console.log("PageView::setup()");
            $.each(registry,function(key, val){
                console.log("Loading: '" + key + "' version: '" + val.version + "'");
                components.push(key);
                widgets[key] = widget_factory.build(key);
            });
        };

        proto.reload = function(){
            console.log("PageView::reload()");
            var futures = []
            $.each(widgets, function( key, val ) {
                console.log("PageView::reload(): reloading widget: " + key);
                futures.push(val.future_value());
            });
            return futures;
        };

        return proto;
        })($({
})));
// end of the slightly mental way of defining a singleton class

    return PageView;
};
