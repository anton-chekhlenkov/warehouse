package com.warehouse

import com.warehouse.domain.security.Role
import com.warehouse.domain.security.User
import com.warehouse.security.Authority
import grails.util.Holders

class InitializationService {

    def grailsApplication

    def userService

    def initialize() {
        log.info "Initializing application system data"

        initRoles()
        initAdmin()
        initFirstUser()

        log.info "Application system data initialized"
    }

    private def initRoles() {
        log.info('Creating roles')

        Authority.values().each { auth ->
            def role = Role.findByAuth(auth)
            if (!role) {
                role = new Role(authority: auth?.name()).save(flush: true)
                if (role.hasErrors()) {
                    role.errors.each { log.error(it) }
                    throw new RuntimeException("Unable to create the role $auth")
                }
                log.info("Inserted role: ${auth}")
            }
        }
    }

    private def initAdmin() {
        def adminLogin = grailsApplication.config.system.admin.login as String
        def adminPass = grailsApplication.config.system.admin.password as String

        if (!User.findByUsername(adminLogin)) {
            log.info("Admin: creation...")

            def admin = new User(username: adminLogin, enabled: true, accountLocked: false, password: adminPass)
            def savedAdmin = userService.createUser(admin, Authority.ROLE_ADMIN)
            if (savedAdmin.hasErrors()) {
                savedAdmin.errors.each { log.error(it) }
                throw new RuntimeException("Error creating admin")
            }

            log.info("Admin: created successfully")
        }
    }

    private def initFirstUser() {
        def login = Holders.config.system.user.login
        def password = Holders.config.system.user.password

        if (!User.findByUsername(login)) {
            def user = new User(username: login, enabled: true, accountLocked: false, password: password)
            def savedUser = userService.createUser(user, Authority.ROLE_USER)
            if (savedUser.hasErrors()) {
                log.info("Test user was not created")
                savedUser.errors.each { log.error(it) }
            }

        }
    }

}