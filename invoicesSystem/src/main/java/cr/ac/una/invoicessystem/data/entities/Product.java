package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "currency", length = 32)
    private String currency;

    @Column(name = "price")
    private Integer price;

    @Column(name = "measure_unit", length = 16)
    private String measureUnit;

}