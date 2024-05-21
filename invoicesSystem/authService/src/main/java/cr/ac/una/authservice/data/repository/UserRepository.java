package cr.ac.una.authservice.data.repository;

import cr.ac.una.authservice.data.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByNaturalId(String naturalId);
    Boolean existsByNaturalId(String naturalId);
}