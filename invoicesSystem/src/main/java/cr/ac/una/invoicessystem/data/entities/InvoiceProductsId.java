package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class InvoiceProductsId implements Serializable {
    private static final long serialVersionUID = 7558016626574549299L;
    @Column(name = "id_invoice", nullable = false)
    private Integer idInvoice;

    @Column(name = "id_products", nullable = false)
    private Integer idProducts;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceProductsId entity = (InvoiceProductsId) o;
        return Objects.equals(this.idProducts, entity.idProducts) &&
                Objects.equals(this.idInvoice, entity.idInvoice);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProducts, idInvoice);
    }

}