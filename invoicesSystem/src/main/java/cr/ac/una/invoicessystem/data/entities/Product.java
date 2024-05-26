package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
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

    @Column(name = "code", length = 32, nullable = false)
    private String code;

    @Column(name = "name", length = 32, nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private Integer price;

    @OneToMany(mappedBy = "product", orphanRemoval = true)
    @JsonBackReference
    private Set<InvoiceProduct> invoiceProducts = new HashSet<>();

    @JsonBackReference
    @ManyToOne
    private User user;

    @ManyToOne
    @JsonManagedReference
    private MeasureUnit measureUnits;

    public void addInvoice(InvoiceProduct invoice) {
        invoiceProducts.add(invoice);
        invoice.setProduct(this);
    }
}