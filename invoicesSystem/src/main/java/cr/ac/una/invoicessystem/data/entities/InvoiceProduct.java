package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "invoice_products")
public class InvoiceProduct {
    @EmbeddedId
    @JsonBackReference
    private InvoiceProductId id;

    @MapsId("idInvoice")
    @ManyToOne(optional = false)
    @JsonBackReference
    private Invoice invoice;

    @MapsId("idProducts")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonManagedReference
    private Product product;

    @Column(name = "quantity")
    private Long quantity;
}