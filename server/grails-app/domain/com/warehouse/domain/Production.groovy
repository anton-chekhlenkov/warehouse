package com.warehouse.domain


import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Secured(['ROLE_USER', 'ROLE_ADMIN'])
@Resource(uri = '/api/production')
class Production {

    String extId

    String name

    String brand

    Long price

    Integer packSize

    Integer amount

    static constraints = {
        extId nullable: false, blank: false, unique: true
        name nullable: false, blank: false
        brand nullable: false, blank: false
        price nullable: false, blank: false
        packSize nullable: false, blank: false
    }

}