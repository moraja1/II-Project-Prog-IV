package cr.ac.una.authservice.security.service;

import cr.ac.una.authservice.data.entities.UserEntity;
import cr.ac.una.authservice.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailsImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByNaturalId(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole().getName().name())).collect(Collectors.toSet());

        return User.builder()
                .username(user.getNaturalId())
                .password(user.getPassword())
                .authorities(grantedAuthorities)
                .build();
    }
}
