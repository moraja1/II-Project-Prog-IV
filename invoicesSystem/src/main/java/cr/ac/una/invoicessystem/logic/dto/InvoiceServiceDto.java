package cr.ac.una.invoicessystem.logic.dto;

import java.io.Serializable;

/**
 * DTO for {@link cr.ac.una.invoicessystem.data.entities.InvoiceService}
 */
public record InvoiceServiceDto(ServiceDto service, Integer hourAmount) implements Serializable {
}