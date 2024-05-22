package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.SupplierType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierTypeRepository extends JpaRepository<SupplierType, Long> {
}