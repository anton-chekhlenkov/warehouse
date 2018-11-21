package com.warehouse

import com.warehouse.domain.security.Role
import com.warehouse.domain.security.User
import com.warehouse.domain.security.UserRole
import com.warehouse.security.Authority
import grails.gorm.transactions.Transactional

@Transactional
class UserService {

    User createUser(User user, def roles = []) {
        if (!user.hasErrors()) {
            user = user.save()

            roles.each { Authority auth ->
                Role role = Role.findByAuth(auth)
                if (role) {
                    UserRole userRole = UserRole.create(user, role, true)
                    if (userRole.hasErrors()) {
                        log.error "Unable to grant role to [$user.id]:$user.username"

                        userRole.errors.each { log.error '[${user.username}] - ' + it }
                        userRole.discard()
                        user.discard()
                    }
                }
            }
        } else {
            log.debug("Submitted details for new user account are invalid")
            user.errors.each { log.debug it as String }
        }

        user
    }

}
