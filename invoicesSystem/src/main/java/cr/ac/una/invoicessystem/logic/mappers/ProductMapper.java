package cr.ac.una.invoicessystem.logic.mappers;

import cr.ac.una.invoicessystem.data.entities.Product;
import cr.ac.una.invoicessystem.logic.dto.ProductDto;

public class ProductMapper {
    public static Product mapProductDtoToProduct(ProductDto product) {
        return Product.builder()
                .id(product.id())
                .code(product.code())
                .name(product.name())
                .price(product.price())
                .measureUnits(MeasureUnitMapper.mapMeasureUnitDtoToMeasureUnit(product.measureUnits()))
                .build();
    }
}
