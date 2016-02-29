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

var menubar = {
        toolbar: {
            nav: {
                css: { classes:[ 'navbar', 'navbar-default'] },
                div: [{
                    css: { classes:[ 'container-fluid'] },
                    div: { css: { classes:[ 'navbar-header'] },
                        button: { css: { classes:[ 'navbar-toggle','collapsed'] },
                            data: [ {name: "toggle", value: "collapse"},
                                {name: "target", value: "#bs-example-navbar-collapse-1"}],

                                aria: [ {name: "expanded", value: "false"}],
                                span: [ { css: { classes: ['sr-only'] }}, { css: { classes: ['icon-bar'] }}]
                        }
                    },
                    a: { css: { classes:[ 'navbar-brand'] } }
                },
                {
                    css: { classes:[ 'container-fluid'] },
                    div: {
                        css: { classes:[ 'navbar-collapse','collapse'], id: "bs-example-navbar-collapse-1"},
                        ul: {
                            css: { classes:[ 'navbar-nav','nav'] },
                            li: [
                                { css: { classes:[ 'active'] },
                                    a: { css: { classes: [] },
                                        span: { css: { classes:[ 'sr-only' ] }, } } },
                                        { css: { classes:[] },
                                            a: { css: { classes: [] }, } },

                                            { css: { classes:[ 'dropdown'] },
                                                a: { css: { classes: ['dropdown-toggle'] },
                                                    role: "button",
                                                    data: [ {name: "toggle", value: "dropdown"}],
                                                    aria: [ {name: "haspopup", value: "true"},
                                                        {name: "expanded", value: "false"}],
                                                        span: { css: { classes:[ 'caret' ] } }} }]
                        } }
                }]
            }
        },
        nav: [
            {
            name: 'fs-inline-list-left',
            selector: '.',
            root: {
                links:[{
                    text: 'Foo',
                    target: '/foo'
                }],
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
                links:[{
                    text: 'Foo',
                    target: '/foo'
                }],
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

    function booststrap_navigation_bar(list_config)
    {
        //  var root = $(list_config.selector + list_config.name);
        var root = $("<nav></nav>");
    }

    function broadcast_css_updates(list_config,child,grandchild)
    {
        console.log("Config for list: " + list_config.name);

      //  var root = $(list_config.selector + list_config.name);
        var root = $("<ul></ul>");

        // add the parent css classes
        $.each(list_config.root.css.classes,function(idx,el){
            // broadcast add css class message
            $(document).trigger(list_config.name + ".layout.classes.added",root,el);
        });

        // publish children events
        $.each(list_config.root.links,function(idx,el){
            // broadcast add css class message
            var list_item = $("<child></child>".replace("child",child));
            var anchor = $("<grandchild></grandchild>".replace("grandchild",grandchild));
            anchor.text(el.text);

            // fixup relative url to point at site
            $(anchor).attr('href', function(index, href) {
                var site_base = "/fixme/app.js";
                return (el.target.charAt(0) != '/') ? el.target : site_base + el.target;
            });

            // publish adding li
            $(document).trigger("layout.element.added",root,list_item);

            // publish adding li css
            $.each(list_config.root[child].css.classes, function(idx,el) {
                $(document).trigger(list_config.name + ".layout.classes.added",[list_item,el]);
            });// li.css

            // publish adding li a
            $(document).trigger("layout.element.added",list_item,anchor);

            // publish adding li a css
            $.each(list_config.root[child][grandchild].css.classes,function(idx,el){
                $(document).trigger(list_config.name + ".layout.classes.added",[link,el]);
            }); // li.a.css
        });

        return root;
    }


// subscribe to update elements as needed
$(document).on("javascript.libraries.added",function(e, library){
    var element = $("<script></script>");
    $(document).trigger("layout.element.attribute.written",element,'type',function(){return 'text/javascript';});
    $(document).trigger("layout.element.attribute.written",element,'src', function(){return library;});
    $(document).trigger("layout.element.added",$(body),element);
});

// subscribe to add elements
$(document).on("layout.element.added",function(e, element, child){
    $(element).append(child);
});

// subscribe to add css
$(document).on("layout.classes.added",function(e, element, css_class_to_add){
    $(element).addClass(css_class_to_add);
});

// subscribe to add attributes
$(document).on("layout.element.attribute.written",function(e, element, name, continuation){
    $(element).attr(name,function(index,original_value){
        return continuation(index,original_value);
    });
});


$(document).on("masthead.data.load.done",function(e,resp){
    $.each(menubar.nav,function(){
        var list_config = this;
        var list = broadcast_css_updates(list_config,'li','a');
        $(document).trigger("layout.element.added",$(body),list);
    }); // nav elements
}); // nav elements


// bind on load
$(document).ready(function(){
    PageView.setup();
    PageView.reload();
}); // doc ready
