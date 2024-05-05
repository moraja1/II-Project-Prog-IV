package cr.ac.una.invoicessystem.data.dto;

import lombok.Builder;

import java.io.Serializable;

/**
 * DTO for {@link cr.ac.una.invoicessystem.data.entities.Admin}
 */
@Builder
public record AdminDto(Long id,
                       String naturalId,
                       String pass,
                       String name,
                       String lastName,
                       String email) implements Serializable {
}