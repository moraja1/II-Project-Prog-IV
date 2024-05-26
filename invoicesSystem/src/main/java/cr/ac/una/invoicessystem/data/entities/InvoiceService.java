package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "invoice_services")
public class InvoiceService {
    @EmbeddedId
    @JsonBackReference
    private InvoiceServiceId id;

    @MapsId("idInvoice")
    @ManyToOne(optional = false)
    @JsonBackReference
    private Invoice invoice;

    @MapsId("idService")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonManagedReference
    private Service service;

    @Column(name = "hour_amount")
    private Long hourAmount;
}