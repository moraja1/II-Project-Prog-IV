package cr.ac.una.invoicessystem.logic.mappers;

import cr.ac.una.invoicessystem.data.entities.MeasureUnit;
import cr.ac.una.invoicessystem.logic.dto.MeasureUnitDto;

public class MeasureUnitMapper {

    public static MeasureUnit mapMeasureUnitDtoToMeasureUnit(MeasureUnitDto measureUnitDto) {
        return MeasureUnit.builder()
                .id(measureUnitDto.id())
                .name(measureUnitDto.name())
                .symbol(measureUnitDto.symbol())
                .build();
    }
}
