package cr.ac.una.ministryregisteredstub.business.service;

import cr.ac.una.ministryregisteredstub.data.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean existisUserByUsuario(String usuario) {
        return userRepository.existsByUsuario(usuario);
    }
}
