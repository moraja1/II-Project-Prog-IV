package cr.ac.una.invoicessystem.logic.mappers;

import cr.ac.una.invoicessystem.data.dto.AdminDto;
import cr.ac.una.invoicessystem.data.entities.Admin;

public class AdminMapper {
    public static AdminDto entityToDto(Admin admin) {
        return AdminDto.builder()
                .id(admin.getId())
                .naturalId(admin.getNaturalId())
                .name(admin.getName())
                .lastName(admin.getLastName())
                .email(admin.getEmail())
                .build();
    }
}
