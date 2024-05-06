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

    private final UserService adminService;
    private final UserService supplierService;

    public AuthGateway(UserService adminService, UserService supplierService) {
        this.adminService = adminService;
        this.supplierService = supplierService;
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody(required = false) LoginFormDto loginFormDto) {
        boolean isAuthenticated = adminService.isAuthorized(loginFormDto);
        return isAuthenticated ? ResponseEntity.ok(true) : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
