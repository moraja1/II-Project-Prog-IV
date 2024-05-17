package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", nullable = false)
    private Integer id;

    @Column(name = "email", length = 32)
    private String email;

    @ColumnDefault("b'0'")
    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "last_name", length = 32)
    private String lastName;

    @Column(name = "mobile", length = 16)
    private String mobile;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "natural_id", length = 16)
    private String naturalId;

    @Column(name = "password", length = 32)
    private String password;

    @Column(name = "role", length = 16)
    private String role;

    @Column(name = "type", length = 16)
    private String type;

    @OneToMany(mappedBy = "idUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Client> clients = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Invoice> invoices = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "id")
    private Set<Product> products = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "id")
    private Set<Service> services = new LinkedHashSet<>();

    public void addClient(Client client) {
        clients.add(client);
        client.setIdUser(this);
    }

    public void addInvoice(Invoice invoice) {
        invoices.add(invoice);
        invoice.setIdUser(this);
    }
}