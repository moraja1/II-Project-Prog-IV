package cr.ac.una.ministryregisteredstub.presentation.controller;

import cr.ac.una.ministryregisteredstub.business.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/", produces = "application/json")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("user/{id}")
    public Boolean isUserRegistered(@PathVariable("id") String id){
        Boolean b = userService.existisUserByUsuario(id);
        System.out.println();
        return b;
    }
}
