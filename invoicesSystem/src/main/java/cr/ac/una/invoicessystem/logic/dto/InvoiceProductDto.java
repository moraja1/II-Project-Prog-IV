package cr.ac.una.invoicessystem.logic.dto;

import java.io.Serializable;

/**
 * DTO for {@link cr.ac.una.invoicessystem.data.entities.InvoiceProduct}
 */
public record InvoiceProductDto(ProductDto product, Integer quantity) implements Serializable {
}