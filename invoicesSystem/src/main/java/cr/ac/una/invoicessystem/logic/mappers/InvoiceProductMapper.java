package cr.ac.una.invoicessystem.logic.mappers;

import cr.ac.una.invoicessystem.data.entities.InvoiceProduct;
import cr.ac.una.invoicessystem.logic.dto.InvoiceProductDto;

public class InvoiceProductMapper {
    public static InvoiceProduct mapInvoiceProductDtoToInvoiceProduct(InvoiceProductDto invoiceProduct) {
        return InvoiceProduct.builder()
                .product(ProductMapper.mapProductDtoToProduct(invoiceProduct.product()))
                .quantity(invoiceProduct.quantity())
                .build();
    }
}
