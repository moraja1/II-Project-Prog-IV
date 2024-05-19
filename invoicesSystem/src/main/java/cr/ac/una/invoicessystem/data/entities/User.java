package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.NaturalId;

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
    private Long id;

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

    @NaturalId
    @Column(name = "natural_id", length = 16)
    private String naturalId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 32)
    private String password;

    @Column(name = "role", length = 16)
    private String role;

    @Column(name = "type", length = 16)
    private String type;

    @JsonManagedReference
    @OneToMany(mappedBy = "idUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Client> clients = new LinkedHashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "idUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Invoice> invoices = new LinkedHashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "idUser", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserProduct> products = new LinkedHashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "idUser", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserService> services = new LinkedHashSet<>();

    @Transient
    private Boolean isAuthenticated = false;

    public void addClient(Client client) {
        clients.add(client);
        client.setIdUser(this);
    }

    public void addInvoice(Invoice invoice) {
        invoices.add(invoice);
        invoice.setIdUser(this);
    }

    public void addUserProduct(UserProduct product) {
        products.add(product);
        product.setIdUser(this);
    }

    public void addUserService(UserService service) {
        services.add(service);
        service.setIdUser(this);
    }
}