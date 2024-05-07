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
    private Integer invoiceIdInvoice;

    @Column(name = "id_products", nullable = false)
    private Integer productsIdProducts;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceProductsId entity = (InvoiceProductsId) o;
        return Objects.equals(this.productsIdProducts, entity.productsIdProducts) &&
                Objects.equals(this.invoiceIdInvoice, entity.invoiceIdInvoice);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productsIdProducts, invoiceIdInvoice);
    }

}