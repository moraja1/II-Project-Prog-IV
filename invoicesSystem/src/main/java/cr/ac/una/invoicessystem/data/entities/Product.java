package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_products", nullable = false)
    private Long id;

    @Column(name = "code", length = 32)
    private String code;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "price")
    private Integer price;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "idProducts", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<InvoiceProduct> invoiceProducts = new LinkedHashSet<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "idProducts", orphanRemoval = true)
    private Set<UserProduct> users = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_measure_units", nullable = false)
    private MeasureUnit idMeasureUnits;

    public void addUserProduct(UserProduct user) {
        users.add(user);
        user.setIdProducts(this);
    }
}