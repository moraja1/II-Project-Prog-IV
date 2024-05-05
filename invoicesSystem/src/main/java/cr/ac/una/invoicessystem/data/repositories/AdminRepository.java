package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByNaturalIdAndPass(String naturalId, String pass);
}