package cr.ac.una.invoicessystem.data.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductFormDto {
    private Long supplierId;
    private String code;
    private String name;
    private Integer price;
    private MeasureUnitDto measureUnit;
}
