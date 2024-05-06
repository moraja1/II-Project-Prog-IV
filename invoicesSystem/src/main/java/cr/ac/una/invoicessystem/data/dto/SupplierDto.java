package cr.ac.una.invoicessystem.data.dto;

import cr.ac.una.invoicessystem.data.entities.Supplier;
import lombok.Builder;

import java.io.Serializable;

/**
 * DTO for {@link Supplier}
 */
@Builder
public record SupplierDto(Long id,
                          String naturalId,
                          String name,
                          String lastName,
                          String email,
                          Boolean hasAccess,
                          String service) implements Serializable {
}