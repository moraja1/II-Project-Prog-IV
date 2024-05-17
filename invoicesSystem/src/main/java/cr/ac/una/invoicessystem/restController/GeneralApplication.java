package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.data.entities.Client;
import cr.ac.una.invoicessystem.data.entities.User;
import cr.ac.una.invoicessystem.data.dto.ClientFormDto;
import cr.ac.una.invoicessystem.data.repositories.ClientRepository;
import cr.ac.una.invoicessystem.data.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class GeneralApplication {
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;

    public GeneralApplication(UserRepository userRepository,
                              ClientRepository clientRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
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
    private ResponseEntity<Client> addClient(@RequestBody ClientFormDto client, UriComponentsBuilder ucb) {
        //Validations
        if(client.getNaturalId() == null || client.getName() == null || client.getLastName() == null ||
                client.getEmail() == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<User> userOptional = userRepository.findById(client.getSupplierId());
        if(userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        //Valid input
        Client clientToSave = Client.builder()
                .naturalId(client.getNaturalId())
                .name(client.getName())
                .lastName(client.getLastName())
                .email(client.getEmail())
                .mobile(client.getMobile())
                .build();

        URI locationOfNewClient = ucb
                .path("users/client/{id}")
                .buildAndExpand(clientToSave.getNaturalId())
                .toUri();

        System.out.println(locationOfNewClient);

        /*userOptional.get().addClient(clientToSave);
        Optional<Client> savedClient = clientRepository.findByNaturalId(clientToSave.getNaturalId());
        if(savedClient.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();*/


        return ResponseEntity.ok(new Client());
    }

    @GetMapping("/users/client/{id}")
    private ResponseEntity<Client> getClient(@PathVariable Long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        return optionalClient.map(client ->
                ResponseEntity.ok().body(client)).orElseGet(() ->
                ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }
}
