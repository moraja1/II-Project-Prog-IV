package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.InvoiceProduct;
import cr.ac.una.invoicessystem.data.entities.InvoiceProductId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceProductRepository extends JpaRepository<InvoiceProduct, InvoiceProductId> {
}