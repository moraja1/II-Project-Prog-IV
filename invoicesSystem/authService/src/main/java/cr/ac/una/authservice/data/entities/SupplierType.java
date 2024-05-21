package cr.ac.una.authservice.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "supplier_type")
public class SupplierType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_supplier_type", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EType name;

    @OneToMany(mappedBy = "type", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<User> users = new HashSet<>();

    public void addUser(User user) {
        users.add(user);
        user.setType(this);
    }
}
