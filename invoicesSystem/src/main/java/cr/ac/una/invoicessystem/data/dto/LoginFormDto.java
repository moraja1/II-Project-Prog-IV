package cr.ac.una.invoicessystem.data.dto;

import lombok.Builder;

import java.io.Serializable;

@Builder
public record LoginFormDto(String username, String password) implements Serializable {
}
