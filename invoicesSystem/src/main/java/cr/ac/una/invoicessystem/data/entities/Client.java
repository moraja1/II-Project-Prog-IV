package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client", nullable = false)
    private Long id;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "last_name", length = 32)
    private String lastName;

    @Column(name = "natural_id", length = 32)
    private String naturalId;

    @Column(name = "mobile", length = 16)
    private String mobile;

    @Column(name = "email", length = 32)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

}