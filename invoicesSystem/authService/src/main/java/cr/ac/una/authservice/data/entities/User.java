package cr.ac.una.authservice.data.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "natural_id")
        })
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", nullable = false)
    private Long id;

    @NaturalId
    @Column(name = "natural_id", length = 16)
    private String naturalId;

    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "last_name", length = 32)
    private String lastName;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_supplier_type", nullable = false)
    @JsonManagedReference
    private SupplierType type;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 256)
    private String password;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserRole> roles = new HashSet<>();

    @ColumnDefault("b'0'")
    @Column(name = "enabled")
    private Boolean enabled;
    @Transient
    private Collection<? extends GrantedAuthority> authorities;

    public static User build(User user) {
        List<GrantedAuthority> authorities;
        authorities = user.getRoles() == null ? new ArrayList<>() : user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().getName().name()))
                .collect(Collectors.toList());

        return new User(
                user.getId(),
                user.getNaturalId(),
                user.getName(),
                user.getLastName(),
                user.getType(),
                user.getPassword(),
                user.getRoles(),
                user.isEnabled(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return naturalId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void addRole(UserRole role) {
        roles.add(role);
        role.setUser(this);
    }
}