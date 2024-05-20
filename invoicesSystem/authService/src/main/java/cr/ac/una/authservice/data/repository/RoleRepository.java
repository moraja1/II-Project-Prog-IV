package cr.ac.una.authservice.data.repository;

import cr.ac.una.authservice.data.entities.ERole;
import cr.ac.una.authservice.data.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}