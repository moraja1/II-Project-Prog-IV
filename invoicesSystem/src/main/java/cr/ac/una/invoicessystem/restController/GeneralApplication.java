package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.data.dto.ClientFormDto;
import cr.ac.una.invoicessystem.data.entities.Client;
import cr.ac.una.invoicessystem.data.entities.User;
import cr.ac.una.invoicessystem.data.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class GeneralApplication {
    private final UserRepository userRepository;

    public GeneralApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PatchMapping("/users/{id}")
    private ResponseEntity<User> updateUserEnable(@PathVariable int id, @RequestBody User user) {
        Optional<User> userOptional = userRepository.findByNaturalIdAndPassword(user.getNaturalId(), user.getPassword());
        if (userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

        userOptional.get().setName(user.getName());
        userOptional.get().setLastName(user.getLastName());
        userOptional.get().setEmail(user.getEmail());
        userOptional.get().setMobile(user.getMobile());
        userRepository.save(userOptional.get());

        return ResponseEntity.ok().body(userOptional.get());
    }

    @PutMapping("/users/client")
    private ResponseEntity<Client> addClient(@RequestBody ClientFormDto client) {
        //Validations
        if(client.getNaturalId() == null || client.getName() == null || client.getLastName() == null ||
                client.getEmail() == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<User> userOptional = userRepository.findById(client.getSupplierId());
        if(userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        //Valid input

        return ResponseEntity.ok(new Client());
    }
}
