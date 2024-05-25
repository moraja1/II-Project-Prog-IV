package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "invoice_products")
public class InvoiceProduct {
    @EmbeddedId
    @JsonBackReference
    private InvoiceProductId id;

    @MapsId("idInvoice")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_invoice", nullable = false)
    @JsonBackReference
    private Invoice idInvoice;

    @MapsId("idProducts")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_products", nullable = false)
    @JsonManagedReference
    private Product products;

    @Column(name = "quantity")
    private Integer quantity;
}