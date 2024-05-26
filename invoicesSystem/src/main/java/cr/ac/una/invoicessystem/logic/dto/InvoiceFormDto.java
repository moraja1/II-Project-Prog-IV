package cr.ac.una.invoicessystem.logic.dto;

import java.io.Serializable;
import java.util.List;

public record InvoiceFormDto(String code,
                             Integer iva,
                             Double subtotal,
                             Double total,
                             ClientDto client,
                             List<InvoiceProductDto> products,
                             List<InvoiceServiceDto> services) implements Serializable {
}


