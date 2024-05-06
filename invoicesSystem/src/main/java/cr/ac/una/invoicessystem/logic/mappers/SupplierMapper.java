package cr.ac.una.invoicessystem.logic.mappers;

import cr.ac.una.invoicessystem.data.dto.SupplierDto;
import cr.ac.una.invoicessystem.data.entities.Supplier;

public class SupplierMapper {
    public SupplierDto entityToDto(Supplier entity) {
        return SupplierDto.builder()
                .id(entity.getId())
                .naturalId(entity.getNaturalId())
                .name(entity.getName())
                .lastName(entity.getLastName())
                .email(entity.getEmail())
                .hasAccess(entity.getHasAccess())
                .service(entity.getService())
                .build();
    }
}
