package com.warehouse.domain

class Production {

    String extId

    String name

    String brand

    Long price

    Integer packSize

    Integer amount

    static mapping = {
        id generator: 'increment'
    }

    static constraints = {
        extId nullable: false, blank: false, unique: true
        name nullable: false, blank: false
        brand nullable: false, blank: false
        price nullable: false, blank: false
        packSize nullable: false, blank: false
    }

}