package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.UserRole;
import cr.ac.una.invoicessystem.data.entities.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
}