package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_products", nullable = false)
    private Integer id;

    @Column(name = "code", length = 32)
    private String code;

    @Column(name = "currency", length = 32)
    private String currency;

    @Column(name = "measure_unit", length = 16)
    private String measureUnit;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "price")
    private Integer price;

    @OneToMany(mappedBy = "idProducts")
    private Set<InvoiceProduct> invoiceProducts = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "id")
    private Set<User> users = new LinkedHashSet<>();

}