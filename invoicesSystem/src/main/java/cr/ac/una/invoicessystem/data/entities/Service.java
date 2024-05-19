package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@Entity
@Table(name = "service")
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_service", nullable = false)
    private Long id;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "price_hour")
    private Integer priceHour;

    @OneToMany(mappedBy = "idService", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<InvoiceService> invoiceServices = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idService", orphanRemoval = true)
    private Set<UserService> users = new LinkedHashSet<>();

    public void addUserService(UserService user) {
        users.add(user);
        user.setIdService(this);
    }

}