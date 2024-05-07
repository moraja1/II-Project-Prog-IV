package cr.ac.una.invoicessystem.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", nullable = false)
    private Integer id;

    @Column(name = "natural_id", length = 16)
    private String naturalId;

    @Column(name = "password", length = 32)
    private String password;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "last_name", length = 32)
    private String lastName;

    @Column(name = "mobile", length = 16)
    private String mobile;

    @Column(name = "email", length = 32)
    private String email;

    @ColumnDefault("0")
    @Column(name = "enabled")
    private Byte enabled;

    @Column(name = "type", length = 16)
    private String type;

    @Column(name = "role", length = 16)
    private String role;

}