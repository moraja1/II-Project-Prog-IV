package cr.ac.una.ministryregisteredstub.data.repository;

import cr.ac.una.ministryregisteredstub.data.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User getUserByUsuario(String usuario);

    Boolean existsByUsuario(String usuario);
}
