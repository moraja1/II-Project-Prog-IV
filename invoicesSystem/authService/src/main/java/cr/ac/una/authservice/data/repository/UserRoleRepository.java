package cr.ac.una.authservice.data.repository;

import cr.ac.una.authservice.data.entities.UserRole;
import cr.ac.una.authservice.data.entities.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
}