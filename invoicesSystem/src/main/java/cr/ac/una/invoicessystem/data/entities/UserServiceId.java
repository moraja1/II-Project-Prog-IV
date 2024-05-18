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
public class UserServiceId implements Serializable {
    private static final long serialVersionUID = 1233513898684529540L;
    @Column(name = "id_service", nullable = false)
    private Long idService;

    @Column(name = "id_user", nullable = false)
    private Long  idUser;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserServiceId entity = (UserServiceId) o;
        return Objects.equals(this.idUser, entity.idUser) &&
                Objects.equals(this.idService, entity.idService);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, idService);
    }

}