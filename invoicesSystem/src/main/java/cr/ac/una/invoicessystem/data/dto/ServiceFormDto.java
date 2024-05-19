package cr.ac.una.invoicessystem.data.dto;

import lombok.*;

@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceFormDto {
    private Long supplierId;
    private String name;
    private Integer price;
}
