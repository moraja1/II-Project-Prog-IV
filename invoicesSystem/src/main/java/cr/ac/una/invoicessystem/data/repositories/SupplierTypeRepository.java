package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.EType;
import cr.ac.una.invoicessystem.data.entities.SupplierType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SupplierTypeRepository extends JpaRepository<SupplierType, Long> {
    Optional<SupplierType> findByName(EType eType);
}