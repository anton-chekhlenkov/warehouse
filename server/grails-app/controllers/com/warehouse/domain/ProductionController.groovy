package com.warehouse.domain

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*

@Secured(['ROLE_USER', 'ROLE_ADMIN'])
class ProductionController extends RestfulController {
    static responseFormats = ['json', 'xml']

    ProductionController() {
        super(Production)
    }
}
