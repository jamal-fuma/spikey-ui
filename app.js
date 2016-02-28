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
        nav: [
            {
            name: 'fs-inline-list-left',
            selector: '.',
            root: {
                css: {
                    classes:[ 'col-xs-12','col-sm-10','col-md-10','col-lg-10' ]
                },
                li: {
                    css: {
                        classes:[ 'col-xs-12','col-sm-2','col-md-2','col-lg-2' ]
                    },
                    a: {
                        css: {
                            classes:[ 'Wt-ip' ]
                        }
                    }
                }
            }
        },
        {
            name: 'fs-inline-list-right',
            selector: '.',
            root: {
                css: {
                    classes:[ 'col-xs-12','col-sm-2','col-md-2','col-lg-2' ]
                },
                li: {
                    css: {
                        classes:[ 'col-xs-12','col-sm-2','col-md-2','col-lg-2' ]
                    },
                    a: {
                        css: {
                            classes:[ 'Wt-ip' ]
                        }
                    }
                }
            }
        }]
    };

    // a binder is a doadadic function taking (the 'bound_variable' and the resumption 'bound_function')
    // a binder returns a niladic function which is a closure over the returning the result of applying the resumption to the bound_variable and any caller supplied arguments
    var binder = function(bound_variable,bound_function) {
        return function() {
            console.log(bound_variable);
            arguments.unshift(bound_variable);
            return bound_function(arguments);
        };
    };

    function broadcast_css_updates(list_config)
    {
        console.log("Config for list: " + list_config.name);

         // add the parent css classes
        var root = $(list_config.selector + list_config.name);
        $.each(list_config.root.css.classes,function(idx,el){
            // broadcast add css class message
            $(document).trigger(list_config.name + ".layout.classes.added",root,el);
        });

        // add the child css classes
        root.find('li').each(function(){
            // broadcast add css class message
            var list_item = $(this);
            $.each(list_config.root['li'].css.classes, function(idx,el) {
                $(document).trigger(list_config.name + ".layout.classes.added",[list_item,el]);
            });// li.css

            // broadcast add css class message
            list_item.find('a').each(function(){
                var link = $(this);
                $.each(list_config.root['li']['a'].css.classes,function(idx,el){
                    $(document).trigger(list_config.name + ".layout.classes.added",[link,el]);
                }); // li.a.css
            });
        });

        return root;
    }

   $(document).on("masthead.data.load.done",function(e,resp){
        $.each(menubar.nav,function(){
            var list_config = this;

            // subscribe to update elements as needed
            $(document).on(list_config.name + ".layout.classes.added",function(e, element, css_class_to_add){
                $(element).addClass(css_class_to_add);
            });

            // pump events
            broadcast_css_updates(list_config);
        }); // nav elements
    }); // on

}); // doc ready
