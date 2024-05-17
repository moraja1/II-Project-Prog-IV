package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
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
    private Integer id;

    @Column(name = "code")
    private String code;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "iva")
    private Integer iva;

    @Column(name = "subtotal")
    private Integer subtotal;

    @Column(name = "total_price")
    private Integer totalPrice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_client", nullable = false)
    private Client idClient;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    @OneToMany(mappedBy = "idInvoice")
    private Set<InvoiceProduct> invoiceProducts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idInvoice")
    private Set<InvoiceService> invoiceServices = new LinkedHashSet<>();

}