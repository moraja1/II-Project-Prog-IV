package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class InvoiceProductId implements Serializable {
    private static final long serialVersionUID = -2028301497070356683L;
    @Column(name = "invoice_id_invoice", nullable = false)
    private Long idInvoice;

    @Column(name = "product_id_products", nullable = false)
    private Long idProducts;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceProductId entity = (InvoiceProductId) o;
        return Objects.equals(this.idInvoice, entity.idInvoice) &&
                Objects.equals(this.idProducts, entity.idProducts);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idInvoice, idProducts);
    }

}