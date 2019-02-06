package com.warehouse

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")


        "/api/production"(resources: "production") {
            collection {
                '/rest'(controller: 'production', action: 'rest')
            }
        }
        // доступны оба адреса при этом

//        "/api/production/rest"(controller: "production", action: "rest")

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
