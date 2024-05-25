package cr.ac.una.invoicessystem.logic.dto;

import java.util.List;

public record InvoiceFormDto(String code,
                             Integer iva,
                             Long subtotal,
                             Long total,
                             ClientDto client,
                             List<InvoiceProductDto> products,
                             List<InvoiceServiceDto> services) {
}


