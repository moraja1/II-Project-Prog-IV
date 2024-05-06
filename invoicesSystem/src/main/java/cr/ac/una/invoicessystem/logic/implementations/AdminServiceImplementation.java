package cr.ac.una.invoicessystem.logic.implementations;

import cr.ac.una.invoicessystem.data.dto.LoginFormDto;
import cr.ac.una.invoicessystem.data.repositories.AdminRepository;
import cr.ac.una.invoicessystem.logic.UserService;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImplementation implements UserService {

    private final AdminRepository adminRepository;

    public AdminServiceImplementation(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }


    @Override
    public boolean isAuthorized(LoginFormDto loginFormDto) {
        return adminRepository.existsByNaturalIdAndPass(loginFormDto.username(), loginFormDto.password());
    }
}
