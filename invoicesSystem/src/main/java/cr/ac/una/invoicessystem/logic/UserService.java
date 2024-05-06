package cr.ac.una.invoicessystem.logic;

import cr.ac.una.invoicessystem.data.dto.LoginFormDto;

public interface UserService {
    boolean isAuthorized(LoginFormDto loginFormDto);
}
