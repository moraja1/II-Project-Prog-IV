package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.data.entities.User;
import cr.ac.una.invoicessystem.data.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminApplication {

    private final UserRepository userRepository;

    public AdminApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    private ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userRepository.findAll());
    }

    @GetMapping("/user/{id}")
    private ResponseEntity<User> getUserById(@PathVariable int id) {
        Optional<User> user = userRepository.findById(id);
        System.out.println(user.map(Objects::toString).orElse(null));
        return user.map(x -> ResponseEntity.ok().body(x)).orElse(ResponseEntity.notFound().build());
    }
}
