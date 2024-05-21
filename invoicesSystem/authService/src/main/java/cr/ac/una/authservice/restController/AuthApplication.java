package cr.ac.una.authservice.restController;

import cr.ac.una.authservice.data.entities.*;
import cr.ac.una.authservice.data.repository.RoleRepository;
import cr.ac.una.authservice.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthApplication {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthApplication(AuthenticationManager authenticationManager, UserRepository userRepository,
                           RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    private ResponseEntity<User> register(@RequestBody User user) {
        //Validations
        if(userRepository.existsByNaturalId(user.getNaturalId())) return ResponseEntity.badRequest().body(user);
        String uri = String.format("http://localhost:8085/api/user/%s", user.getNaturalId());
        RestTemplate restTemplate = new RestTemplate();
        Boolean isRegisteredInMinistry = restTemplate.getForObject(uri, Boolean.class);
        //Validation of request to Ministry
        if (Boolean.FALSE.equals(isRegisteredInMinistry))
            return ResponseEntity.badRequest().header("Message", "Not Registered in Ministry").build();


        User userToRegister = new User();
        userToRegister.setNaturalId(user.getNaturalId());
        userToRegister.setPassword(passwordEncoder.encode(user.getPassword()));
        userToRegister.setName(user.getName());
        userToRegister.setLastName(user.getLastName());
        userToRegister.setType(user.getType());

        User savedUser = userRepository.save(userToRegister);

        Role role = roleRepository.findByName(ERole.ROLE_USER).get();

        UserRole userRole = new UserRole();
        userRole.setId(new UserRoleId(savedUser.getId(), role.getId()));

        savedUser.setRoles(Collections.singleton(userRole));
        role.setUsers(Collections.singleton(userRole));

    }
}
