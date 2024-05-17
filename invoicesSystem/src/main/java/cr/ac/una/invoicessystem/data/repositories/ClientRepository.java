package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
  Optional<Client> findByNaturalId(String naturalId);
}