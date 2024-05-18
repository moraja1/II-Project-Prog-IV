package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_service", nullable = false)
    private Long id;

    @Column(name = "currency", length = 32)
    private String currency;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "price_hour")
    private Integer priceHour;

    @OneToMany(mappedBy = "idService", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<InvoiceService> invoiceServices = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idService", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserService> users = new LinkedHashSet<>();

}