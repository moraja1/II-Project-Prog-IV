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
    @JoinColumn(name = "id_invoice", nullable = false)
    @JsonBackReference
    private Invoice idInvoice;

    @MapsId("idService")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_service", nullable = false)
    @JsonManagedReference
    private Service service;

    @Column(name = "hour_amount")
    private Integer hourAmount;

    @Column(name = "subtotal")
    private Integer subtotal;

}