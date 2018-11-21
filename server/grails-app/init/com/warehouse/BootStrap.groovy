package com.warehouse


import grails.util.Holders

class BootStrap {

    def initService

    def init = { servletContext ->
        if (Holders.config.system.initialization.enabled) {
            try {
                initService.initialize()
            } catch (e) {
                log.error("Failed to initialize", e)
            }
        } else {
            log.info("Initialization is disabled")
        }
    }

    def destroy = {
    }

}
