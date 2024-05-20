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
public class UserRoleId implements Serializable {
    private static final long serialVersionUID = 2535377720854471148L;
    @Column(name = "user_id", nullable = false)
    private Long idUser;

    @Column(name = "role_id", nullable = false)
    private Integer idRole;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserRoleId entity = (UserRoleId) o;
        return Objects.equals(this.idRole, entity.idRole) &&
                Objects.equals(this.idUser, entity.idUser);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRole, idUser);
    }

}