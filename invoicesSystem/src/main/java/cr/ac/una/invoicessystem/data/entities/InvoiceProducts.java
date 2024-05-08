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

    @MapsId("idInvoice")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_invoice", nullable = false)
    private Invoice idInvoice;

    @MapsId("idProducts")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_products", nullable = false)
    private Product idProducts;

    @Column(name = "cantity")
    private Integer cantity;

    @Column(name = "subtotal")
    private Integer subtotal;

}