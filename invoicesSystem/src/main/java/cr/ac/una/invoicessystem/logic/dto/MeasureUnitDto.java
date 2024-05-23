package cr.ac.una.invoicessystem.logic.dto;

import cr.ac.una.invoicessystem.data.entities.MeasureUnit;
import lombok.Builder;

import java.io.Serializable;

/**
 * DTO for {@link MeasureUnit}
 */
@Builder
public record MeasureUnitDto(Long id, String name, String symbol) implements Serializable {
}