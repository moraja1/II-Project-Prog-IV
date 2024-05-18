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
@Embeddable
@NoArgsConstructor
public class UserProductId implements Serializable {
    private static final long serialVersionUID = -1572156311136382654L;

    @Column(name = "id_products", nullable = false)
    private Long idProducts;

    @Column(name = "id_user", nullable = false)
    private Long idUser;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserProductId entity = (UserProductId) o;
        return Objects.equals(this.idUser, entity.idUser) &&
                Objects.equals(this.idProducts, entity.idProducts);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, idProducts);
    }

}