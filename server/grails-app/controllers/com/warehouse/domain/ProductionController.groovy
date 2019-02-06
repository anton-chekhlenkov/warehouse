package com.warehouse.domain

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*

//@Secured(['ROLE_USER', 'ROLE_ADMIN'])
//@Secured('permitAll')
class ProductionController extends RestfulController {
    static responseFormats = ['json', 'xml']

    ProductionController() {
        super(Production)
    }

    def rest() {
        respond([Production.get(1)])
    }

    @Secured('permitAll')
    def test() {

    }
}
