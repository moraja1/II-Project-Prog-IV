package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.logic.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cr.ac.una.invoicessystem.data.dto.LoginFormDto;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthGateway {

    @PostMapping("/login")
    public ResponseEntity<Boolean> login() {
        return ResponseEntity.ok(true);
    }
}
