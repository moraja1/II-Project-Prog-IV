package cr.ac.una.invoicessystem.logic.dto;

import java.io.Serializable;

/**
 * DTO for {@link cr.ac.una.invoicessystem.data.entities.Service}
 */
public record ServiceDto(Long id, String name, Integer priceHour) implements Serializable {
}