package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.InvoiceService;
import cr.ac.una.invoicessystem.data.entities.InvoiceServiceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceServiceRepository extends JpaRepository<InvoiceService, InvoiceServiceId> {
}