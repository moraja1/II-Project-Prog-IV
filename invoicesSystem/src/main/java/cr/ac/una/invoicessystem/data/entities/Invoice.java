package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

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
    @NaturalId
    private String code;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "iva")
    private Integer iva;

    @Column(name = "subtotal")
    private Integer subtotal;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_client", nullable = false)
    private Client idClient;

    @OneToMany(mappedBy = "idInvoice")
    private Set<InvoiceProducts> invoiceProducts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idInvoice")
    private Set<InvoiceServices> invoiceServices = new LinkedHashSet<>();

}