package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@Table(name = "client")
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client", nullable = false)
    private Long id;

    @NaturalId
    @Column(name = "natural_id", length = 32)
    private String naturalId;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "last_name", length = 32)
    private String lastName;

    @Column(name = "email", length = 32)
    private String email;

    @Column(name = "mobile", length = 16)
    private String mobile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    @OneToMany(mappedBy = "idClient", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Invoice> invoices = new LinkedHashSet<>();

    public void addInvoice(Invoice invoice) {
        invoices.add(invoice);
        invoice.setIdClient(this);
    }
}