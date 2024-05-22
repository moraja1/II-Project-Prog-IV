package cr.ac.una.authservice.data.repository;

import cr.ac.una.authservice.data.entities.EType;
import cr.ac.una.authservice.data.entities.SupplierType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SupplierTypeRepository extends JpaRepository<SupplierType, Long> {
  Optional<SupplierType> findByName(EType name);
}