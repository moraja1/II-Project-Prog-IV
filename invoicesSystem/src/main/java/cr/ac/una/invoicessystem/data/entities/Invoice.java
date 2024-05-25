package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
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
    private Long subtotal;

    @Column(name = "total_price")
    private Long totalPrice;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_client", nullable = false)
    @JsonManagedReference
    private Client idClient;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    @OneToMany(mappedBy = "idInvoice", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<InvoiceProduct> invoiceProducts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idInvoice", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<InvoiceService> invoiceServices = new LinkedHashSet<>();

}