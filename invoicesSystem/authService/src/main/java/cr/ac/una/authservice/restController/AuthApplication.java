package cr.ac.una.authservice.restController;

import cr.ac.una.authservice.data.dto.RegisterFormDto;
import cr.ac.una.authservice.data.entities.*;
import cr.ac.una.authservice.data.repository.RoleRepository;
import cr.ac.una.authservice.data.repository.SupplierTypeRepository;
import cr.ac.una.authservice.data.repository.UserRepository;
import cr.ac.una.authservice.data.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthApplication {

    private final UserRoleRepository userRoleRepository;
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private SupplierTypeRepository supplierTypeRepository;

    @Autowired
    public AuthApplication(AuthenticationManager authenticationManager, UserRepository userRepository,
                           RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserRoleRepository userRoleRepository,
                           SupplierTypeRepository supplierTypeRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRoleRepository = userRoleRepository;
        this.supplierTypeRepository = supplierTypeRepository;
    }

    @PostMapping("/register")
    private ResponseEntity<Void> register(@RequestBody RegisterFormDto register, UriComponentsBuilder ucb) {
        //Validations
        if(userRepository.existsByNaturalId(register.naturalId())) return ResponseEntity.badRequest().build();
        String uri = String.format("http://localhost:8085/api/user/%s", register.naturalId());
        RestTemplate restTemplate = new RestTemplate();
        Boolean isRegisteredInMinistry = restTemplate.getForObject(uri, Boolean.class);
        //Validation of request to Ministry
        if (Boolean.FALSE.equals(isRegisteredInMinistry)) return ResponseEntity.badRequest().header(
                "Message", "Not Registered in Ministry").build();
        Optional<SupplierType> type = supplierTypeRepository.findByName(EType.getEType(register.type()));
        if(type.isEmpty()) return ResponseEntity.badRequest().build();


        User userToRegister = new User();
        userToRegister.setNaturalId(register.naturalId());
        userToRegister.setPassword(passwordEncoder.encode(register.password()));
        userToRegister.setName(register.name());
        userToRegister.setLastName(register.lastName());
        userToRegister.setType(type.get());
        userToRegister.setEnabled(false);

        Role role = roleRepository.findByName(ERole.ROLE_USER).get();

        User savedUser = userRepository.save(userToRegister);

        UserRole userRole = new UserRole();
        userRole.setId(new UserRoleId(savedUser.getId(), role.getId()));

        savedUser.addRole(userRole);
        role.addUser(userRole);

        userRoleRepository.save(userRole);

        URI locationOfNewSupplier = ucb
                .path("/api/users/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.created(locationOfNewSupplier).build();
    }
}
