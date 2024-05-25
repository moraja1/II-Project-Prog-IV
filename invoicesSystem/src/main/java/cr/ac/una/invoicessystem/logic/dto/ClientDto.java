package cr.ac.una.invoicessystem.logic.dto;

import java.io.Serializable;

/**
 * DTO for {@link cr.ac.una.invoicessystem.data.entities.Client}
 */
public record ClientDto(Long id, String naturalId, String name, String lastName, String email,
                        String mobile) implements Serializable {
}