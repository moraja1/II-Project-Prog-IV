package cr.ac.una.invoicessystem.data.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientFormDto {
    private Long supplierId;
    private String name;
    private String lastName;
    private String naturalId;
    private String mobile;
    private String email;
}
