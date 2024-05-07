package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.data.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminApi {
    @GetMapping
    private ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(new ArrayList<User>());
    }
}
