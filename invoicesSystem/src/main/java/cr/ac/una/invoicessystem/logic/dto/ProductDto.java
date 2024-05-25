package cr.ac.una.invoicessystem.logic.dto;

import java.io.Serializable;

/**
 * DTO for {@link cr.ac.una.invoicessystem.data.entities.Product}
 */
public record ProductDto(Long id, String code, String name, Integer price, MeasureUnitDto measureUnits) implements Serializable {
  }