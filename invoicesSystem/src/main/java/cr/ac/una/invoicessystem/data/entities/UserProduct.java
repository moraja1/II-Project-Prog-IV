package cr.ac.una.invoicessystem.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference
    private UserProductId id;

    @MapsId("idProducts")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_products", nullable = false)
    @JsonManagedReference
    private Product product;

    @MapsId("idUser")
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    @JsonBackReference
    private User idUser;

}