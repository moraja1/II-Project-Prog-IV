package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client", nullable = false)
    private Long id;

    @Column(name = "natural_id", length = 32, nullable = false)
    private String naturalId;

    @Column(name = "name", length = 32, nullable = false)
    private String name;

    @Column(name = "last_name", length = 32, nullable = false)
    private String lastName;

    @Column(name = "email", length = 32, nullable = false)
    private String email;

    @Column(name = "mobile", length = 16)
    private String mobile;

    @JsonBackReference
    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private Set<Invoice> invoices = new LinkedHashSet<>();

    public void addInvoice(Invoice invoice) {
        invoices.add(invoice);
        invoice.setClient(this);
    }
}