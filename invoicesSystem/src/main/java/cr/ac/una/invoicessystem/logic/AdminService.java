package cr.ac.una.invoicessystem.logic;

import cr.ac.una.invoicessystem.data.dto.AdminDto;
import cr.ac.una.invoicessystem.data.dto.LoginFormDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
    boolean isAdmin(LoginFormDto loginFormDto);
}
