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
public class InvoiceServicesId implements Serializable {
    private static final long serialVersionUID = -539751984822042493L;
    @Column(name = "id_invoice", nullable = false)
    private Integer idInvoice;

    @Column(name = "id_service", nullable = false)
    private Integer idService;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InvoiceServicesId entity = (InvoiceServicesId) o;
        return Objects.equals(this.idInvoice, entity.idInvoice) &&
                Objects.equals(this.idService, entity.idService);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idInvoice, idService);
    }

}