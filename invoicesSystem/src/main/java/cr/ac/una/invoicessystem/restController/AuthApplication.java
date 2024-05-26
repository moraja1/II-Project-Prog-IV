package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.data.repositories.RoleRepository;
import cr.ac.una.invoicessystem.data.repositories.SupplierTypeRepository;
import cr.ac.una.invoicessystem.data.repositories.UserRepository;
import cr.ac.una.invoicessystem.data.repositories.UserRoleRepository;
import cr.ac.una.invoicessystem.logic.dto.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cr.ac.una.invoicessystem.logic.dto.RegisterFormDto;
import cr.ac.una.invoicessystem.data.entities.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthApplication {

    private UserRoleRepository userRoleRepository;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private SupplierTypeRepository supplierTypeRepository;

    @Autowired
    public AuthApplication(UserRepository userRepository,
                           RoleRepository roleRepository, UserRoleRepository userRoleRepository,
                           SupplierTypeRepository supplierTypeRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.supplierTypeRepository = supplierTypeRepository;
    }

    @PostMapping("register")
    private ResponseEntity<Void> register(@RequestBody RegisterFormDto register, UriComponentsBuilder ucb) {
        //Validations
        if (userRepository.existsByNaturalId(register.naturalId())) return ResponseEntity.badRequest().build();
        String uri = String.format("http://localhost:8085/api/user/%s", register.naturalId());
        RestTemplate restTemplate = new RestTemplate();
        Boolean isRegisteredInMinistry = restTemplate.getForObject(uri, Boolean.class);
        //Validation of request to Ministry
        if (Boolean.FALSE.equals(isRegisteredInMinistry)) return ResponseEntity.badRequest().header(
                "Message", "Not Registered in Ministry").build();
        Optional<SupplierType> type = supplierTypeRepository.findByName(EType.getEType(register.type()));
        if (type.isEmpty()) return ResponseEntity.badRequest().build();
        //Extra validations
        if(register.naturalId().isEmpty() || register.name().isEmpty() || register.password().isEmpty() ||
        register.lastName().isEmpty() || register.type().isEmpty()) return ResponseEntity.badRequest().build();

        User userToRegister = new User();
        userToRegister.setNaturalId(register.naturalId());
        userToRegister.setPassword(register.password());
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

    @PostMapping("login")
    public ResponseEntity<User> login(@RequestBody LoginDto loginDto) {
        Optional<User> user = userRepository.findByNaturalIdAndPassword(loginDto.naturalId(), loginDto.password());
        if (user.isEmpty()) return ResponseEntity.notFound().build();
        if (!user.get().getEnabled()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        user.get().setIsAuthenticated(true);
        return ResponseEntity.ok(user.get());
    }
}
