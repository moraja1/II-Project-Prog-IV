package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client", nullable = false)
    private Long id;

    @Column(name = "email", length = 32)
    private String email;

    @Column(name = "last_name", length = 32)
    private String lastName;

    @Column(name = "mobile", length = 16)
    private String mobile;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "natural_id", length = 32)
    private String naturalId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    @OneToMany(mappedBy = "idClient")
    private Set<Invoice> invoices = new LinkedHashSet<>();

}