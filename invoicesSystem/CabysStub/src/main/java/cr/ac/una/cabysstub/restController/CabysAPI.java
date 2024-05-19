package cr.ac.una.cabysstub.restController;

import cr.ac.una.cabysstub.data.Services;
import cr.ac.una.cabysstub.data.repositories.ServicesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/cabys/api/")
public class CabysAPI {

    private final ServicesRepository servicesRepository;

    public CabysAPI(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    @GetMapping("/services")
    private ResponseEntity<List<Services>> getServices() {
        return ResponseEntity.ok(servicesRepository.findAll());
    }
}
