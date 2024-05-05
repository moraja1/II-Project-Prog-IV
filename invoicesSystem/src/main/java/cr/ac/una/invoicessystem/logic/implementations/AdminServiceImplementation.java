package cr.ac.una.invoicessystem.logic.implementations;

import cr.ac.una.invoicessystem.data.dto.AdminDto;
import cr.ac.una.invoicessystem.data.dto.LoginFormDto;
import cr.ac.una.invoicessystem.data.entities.Admin;
import cr.ac.una.invoicessystem.data.repositories.AdminRepository;
import cr.ac.una.invoicessystem.logic.AdminService;
import cr.ac.una.invoicessystem.logic.mappers.AdminMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImplementation implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImplementation(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }


    @Override
    public boolean isAdmin(LoginFormDto loginFormDto) {
        return adminRepository.existsByNaturalIdAndPass(loginFormDto.username(), loginFormDto.password());
    }
}
