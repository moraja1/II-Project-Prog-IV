package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.UserService;
import cr.ac.una.invoicessystem.data.entities.UserServiceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserServiceRepository extends JpaRepository<UserService, UserServiceId> {
}