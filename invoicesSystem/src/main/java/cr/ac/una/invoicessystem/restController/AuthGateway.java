package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.logic.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cr.ac.una.invoicessystem.data.dto.LoginFormDto;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthGateway {

    private final AdminService adminService;

    public AuthGateway(AdminService adminService) {
        this.adminService = adminService;
    }



    @PostMapping("/login")
    public ResponseEntity<Boolean> login(LoginFormDto loginFormDto) {
        return ResponseEntity.ok(true);
    }
}
