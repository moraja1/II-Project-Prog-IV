package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@Entity
@Table(name = "service")
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_service", nullable = false)
    private Long id;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "price_hour")
    private Integer priceHour;

    @OneToMany(mappedBy = "service", orphanRemoval = true)
    @JsonBackReference
    private Set<InvoiceService> invoiceServices = new LinkedHashSet<>();

    @JsonBackReference
    @ManyToOne
    private User user;

    public void addInvoice(InvoiceService invoice) {
        invoiceServices.add(invoice);
        invoice.setService(this);
    }
}