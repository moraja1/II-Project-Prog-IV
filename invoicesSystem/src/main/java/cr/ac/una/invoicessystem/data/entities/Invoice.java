package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoice", nullable = false)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "date")
    @CreationTimestamp
    private LocalDateTime date;

    @Column(name = "iva")
    private Integer iva;

    @Column(name = "subtotal")
    private Double subtotal;

    @Column(name = "total_price")
    private Double totalPrice;

    @ManyToOne
    @JsonManagedReference
    private Client client;

    @JsonBackReference
    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "invoice", orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<InvoiceProduct> invoiceProducts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "invoice", orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<InvoiceService> invoiceServices = new LinkedHashSet<>();

    public void addInvoiceProduct(InvoiceProduct invoiceProduct) {
        invoiceProducts.add(invoiceProduct);
        invoiceProduct.setInvoice(this);
    }

    public void addInvoiceService(InvoiceService invoiceService) {
        invoiceServices.add(invoiceService);
        invoiceService.setInvoice(this);
    }

}