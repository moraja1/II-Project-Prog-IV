package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.logic.dto.UserTableDto;
import cr.ac.una.invoicessystem.data.entities.User;
import cr.ac.una.invoicessystem.data.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3300")
@RestController
@RequestMapping("/api/admin")
public class AdminApplication {

    private final UserRepository userRepository;

    public AdminApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    private ResponseEntity<List<User>> getAllUsers(Pageable pageable) {
        Page<User> usersPage = userRepository.findAll(PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(new Sort.Order(Sort.Direction.DESC, "id"))));

        List<User> users = new ArrayList<>();
        for(var u : usersPage.getContent()) {
            if(u.getRoles().stream().anyMatch(x -> x.getId().getIdRole().equals(2))) users.add(u);
        }
        return ResponseEntity.ok().body(users);
    }

    @PatchMapping("/users/{id}")
    private ResponseEntity<User> updateUserEnable(@PathVariable Long id, @RequestBody UserTableDto req) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

        userOptional.get().setEnabled(req.enabled());
        userRepository.save(userOptional.get());

        return ResponseEntity.ok().body(userOptional.get());
    }
}
