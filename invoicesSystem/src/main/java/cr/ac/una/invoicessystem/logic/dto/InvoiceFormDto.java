package cr.ac.una.invoicessystem.logic.dto;


import cr.ac.una.invoicessystem.data.entities.Client;
import cr.ac.una.invoicessystem.data.entities.Product;
import cr.ac.una.invoicessystem.data.entities.Service;

import java.util.List;

public record InvoiceFormDto(String code, Integer iva, Long subtotal, Long total, Client client, List<ProductDto> products) {

    public record ProductDto(Product product, Long quantity) {}
    public record ServiceDto(Service service, Long hourAmount) {}
}


