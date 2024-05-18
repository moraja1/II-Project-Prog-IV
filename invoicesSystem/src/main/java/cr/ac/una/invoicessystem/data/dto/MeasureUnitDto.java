package cr.ac.una.invoicessystem.data.dto;

import lombok.Builder;

import java.io.Serializable;

/**
 * DTO for {@link cr.ac.una.invoicessystem.data.entities.MeasureUnit}
 */
@Builder
public record MeasureUnitDto(Long id, String name, String symbol) implements Serializable {
}