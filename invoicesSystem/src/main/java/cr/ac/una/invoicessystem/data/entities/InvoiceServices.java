package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "invoice_services")
public class InvoiceServices {
    @EmbeddedId
    private InvoiceServicesId id;

    @MapsId("idInvoice")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_invoice", nullable = false)
    private Invoice idInvoice;

    @MapsId("idService")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_service", nullable = false)
    private Service idService;

    @Column(name = "hour_amount")
    private Integer hourAmount;

    @Column(name = "subtotal")
    private Integer subtotal;

}