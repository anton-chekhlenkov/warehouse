import com.warehouse.InitializationService
import com.warehouse.UserService
import com.warehouse.security.UserPasswordEncoderListener

beans = {

    userPasswordEncoderListener(UserPasswordEncoderListener)

    userService(UserService)

    initService(InitializationService) {
        grailsApplication = ref('grailsApplication')
        userService = ref('userService')
    }

}
