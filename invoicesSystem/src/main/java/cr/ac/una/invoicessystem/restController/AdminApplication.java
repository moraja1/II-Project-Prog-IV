package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.data.entities.User;
import cr.ac.una.invoicessystem.data.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private ResponseEntity<List<User>> getAllUsers(Pageable pageable) {
        Page<User> usersPage = userRepository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));
        return ResponseEntity.ok().body(usersPage.getContent());
    }

    @GetMapping("/users/{id}")
    private ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        System.out.println(user.map(Objects::toString).orElse(null));
        return user.map(x -> ResponseEntity.ok().body(x)).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/users/{id}")
    private ResponseEntity<User> updateUserEnable(@PathVariable Long id, @RequestBody User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

        userOptional.get().setEnabled(user.getEnabled());
        userRepository.save(userOptional.get());

        return ResponseEntity.ok().body(userOptional.get());
    }
}
