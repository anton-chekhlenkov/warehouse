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

    }

}