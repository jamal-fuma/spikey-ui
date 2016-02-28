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
            root: {
                css: {
                    classes:[ 'col-xs-12','col-sm-10','col-md-10','col-lg-10' ],
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
            }
        },
        {
            name: 'fs-inline-list-right',
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

    $(document).on("masthead.data.load.done",function(e,resp){
        $.each(menubar.nav,function(){
            var list_config  = $(this);
            var list_element = $("." + list_config.name);

            console.log("Config for list: " + list_config.name);

            // add the parent css classes
            $.each(list_config.root.css.classes,function(idx,el){
                console.log("list: " + list_config.name + " add css class " + el);
                list_element.addClass(el);
            });

            // add the child css classes
            list_element.find('li').each(function(){
                var list_item  = $(this);
                var links = [];

                // add the list item css
                $.each(list_config.root.li.css.classes, function(idx,el) {
                    console.log(list_config.name + " add css class " + el + " -> " + list_item.html());
                    list_item.addClass(el);

                    // save element references for later
                    list_item.find('a').each(function(){
                        var link = $(this);
                        // add anchor css
                        $.each(list_config.root.li.a.css.classes,function(idx,el){
                            console.log(list_config.name + " add css class " + el + " -> " + link.href());
                            link.addClass(el);
                        }); // li.a.css
                    }); // li.a
                });// li.css
            }); // root.li
        }); // nav elements
    }); // on

}); // doc read
