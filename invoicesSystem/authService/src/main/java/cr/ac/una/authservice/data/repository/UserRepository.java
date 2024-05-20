package cr.ac.una.authservice.data.repository;

import cr.ac.una.authservice.data.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNaturalId(String naturalId);
}