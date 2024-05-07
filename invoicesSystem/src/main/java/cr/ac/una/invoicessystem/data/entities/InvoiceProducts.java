package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "invoice_products")
public class InvoiceProducts {
    @EmbeddedId
    private InvoiceProductsId id;

    @MapsId("invoiceIdInvoice")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_invoice", nullable = false)
    private Invoice invoiceIdInvoice;

    @MapsId("productsIdProducts")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_products", nullable = false)
    private Product productsIdProducts;

    @Column(name = "cantity")
    private Integer cantity;

    @Column(name = "subtotal")
    private Integer subtotal;

}