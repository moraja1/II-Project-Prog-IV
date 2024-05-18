package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_products")
public class UserProduct {
    private static final long serialVersionUID = -1572156311136382654L;

    @EmbeddedId
    private UserProductId id;

    @MapsId("idProducts")
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_products", nullable = false)
    private Product idProducts;

    @MapsId("idUser")
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

}