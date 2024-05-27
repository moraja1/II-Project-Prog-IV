package cr.ac.una.invoicessystem.restController;

import cr.ac.una.invoicessystem.logic.dto.*;
import cr.ac.una.invoicessystem.data.entities.*;
import cr.ac.una.invoicessystem.data.repositories.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3300")
@RestController
@RequestMapping("/api/users")
public class GeneralApplication {
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final MeasureUnitRepository measureUnitRepository;
    private final ProductRepository productRepository;
    private final ServiceRepository serviceRepository;
    private final InvoiceRepository invoiceRepository;
    private final InvoiceProductRepository invoiceProductRepository;
    private final InvoiceServiceRepository invoiceServiceRepository;
    /*private final InvoiceRepository invoiceRepository;*/

    public GeneralApplication(UserRepository userRepository,
                              ClientRepository clientRepository,
                              MeasureUnitRepository measureUnitRepository,
                              ProductRepository productRepository,
                              ServiceRepository serviceRepository,/*,
                              InvoiceRepository invoiceRepository*/
                              InvoiceRepository invoiceRepository,
                              InvoiceProductRepository invoiceProductRepository,
                              InvoiceServiceRepository invoiceServiceRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.measureUnitRepository = measureUnitRepository;
        this.productRepository = productRepository;
        this.serviceRepository = serviceRepository;
        /*this.invoiceRepository = invoiceRepository;*/
        this.invoiceRepository = invoiceRepository;
        this.invoiceProductRepository = invoiceProductRepository;
        this.invoiceServiceRepository = invoiceServiceRepository;
    }

    @GetMapping("/{id}")
    private ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        System.out.println(user.map(Objects::toString).orElse(null));
        return user.map(x -> ResponseEntity.ok().body(x)).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/profile")
    private ResponseEntity<User> updateUserProfile(@RequestBody ProfileDto profile) {
        Optional<User> userOptional = userRepository.findByNaturalIdAndPassword(profile.naturalId(), profile.password());
        if (userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

        userOptional.get().setName(profile.name());
        userOptional.get().setLastName(profile.lastName());
        userOptional.get().setEmail(profile.email());
        userOptional.get().setMobile(profile.mobile());
        userRepository.save(userOptional.get());

        return ResponseEntity.ok().body(userOptional.get());
    }

    @PostMapping("/client")
    private ResponseEntity<Client> addClient(@RequestBody ClientFormDto client, UriComponentsBuilder ucb) {
        //Validations
        Optional<User> userOptional = userRepository.findById(client.getSupplierId());
        if(userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        boolean exists = false;
        for(var c : userOptional.get().getClients()) {
            if(c.getNaturalId().equals(client.getNaturalId())) {
                exists = true;
                break;
            }
        }
        if(exists) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        //Valid input
        Client clientToSave = Client.builder()
                .naturalId(client.getNaturalId())
                .name(client.getName())
                .lastName(client.getLastName())
                .email(client.getEmail())
                .mobile(client.getMobile())
                .build();

        userOptional.get().addClient(clientToSave);
        Client savedClient = clientRepository.save(clientToSave);
        URI locationOfNewClient = ucb
                .path("/client/{id}")
                .buildAndExpand(clientToSave.getId())
                .toUri();

        return ResponseEntity.created(locationOfNewClient).body(savedClient);
    }

    @GetMapping("/client/{id}")
    private ResponseEntity<Client> getClient(@PathVariable Long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        return optionalClient.map(client ->
                ResponseEntity.ok().body(client)).orElseGet(() ->
                ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/measures")
    private ResponseEntity<List<MeasureUnit>> getAllMeasureUnits() {
        List<MeasureUnit> measuresPage = measureUnitRepository.findAll();
        return ResponseEntity.ok().body(measuresPage);
    }

    @PostMapping("/product")
    private ResponseEntity<Product> addProduct(@RequestBody ProductFormDto product, UriComponentsBuilder ucb) {
        //Validations
        if(product.getName() == null ||
                product.getPrice() == null ||
                product.getPrice() <= 0 ||
                product.getSupplierId() == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<User> userOptional = userRepository.findById(product.getSupplierId());
        if(userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<MeasureUnit> optionalMeasureUnit = measureUnitRepository.findById(product.getMeasureUnit().id());
        if(optionalMeasureUnit.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<Product> optionalProduct = productRepository.findByCode(product.getCode());
        if(optionalProduct.isPresent()) {
            if(Objects.equals(optionalProduct.get().getUser().getId(), userOptional.get().getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }

        //Valid input
        Product productToSave = Product.builder()
                .code(product.getCode())
                .name(product.getName())
                .price(product.getPrice())
                .build();

        optionalMeasureUnit.get().addProduct(productToSave);
        userOptional.get().addProduct(productToSave);
        Product savedProduct = productRepository.save(productToSave);
        URI locationOfNewProduct = ucb
                .path("/product/{id}")
                .buildAndExpand(savedProduct.getId())
                .toUri();

        return ResponseEntity.created(locationOfNewProduct).body(savedProduct);
    }

    @PostMapping("/service")
    private ResponseEntity<Service> addService(@RequestBody ServiceFormDto service, UriComponentsBuilder ucb) {
        Service serviceToSave = null;
        //Validations
        if(service.getName() == null ||
                service.getPrice() == null ||
                service.getPrice() <= 0 ||
                service.getSupplierId() == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<User> userOptional = userRepository.findById(service.getSupplierId());
        if(userOptional.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        for(var s: userOptional.get().getServices()) {
            if(Objects.equals(s.getName(), service.getName()) && Objects.equals(s.getPriceHour(), service.getPrice())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }

        //Valid input
        serviceToSave = Service.builder()
                .name(service.getName())
                .priceHour(service.getPrice())
                .build();

        userOptional.get().addService(serviceToSave);
        Service savedService = serviceRepository.save(serviceToSave);
        URI locationOfNewService = ucb
                .path("/service/{id}")
                .buildAndExpand(savedService.getId())
                .toUri();

        return ResponseEntity.created(locationOfNewService).body(savedService);
    }

    @GetMapping("products")
    private ResponseEntity<List<Product>> getAllProducts(@RequestHeader("sub") String sub) {
        //Validations
        Optional<User> optionalUser = userRepository.findById(Long.parseLong(sub));
        if(optionalUser.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(optionalUser.get().getProducts().stream().toList());
    }

    @GetMapping("services")
    private ResponseEntity<List<Service>> getAllServices(@RequestHeader("sub") String sub) {
        //Validations
        Optional<User> optionalUser = userRepository.findById(Long.parseLong(sub));
        if(optionalUser.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(optionalUser.get().getServices().stream().toList());
    }

    @GetMapping("clients")
    private ResponseEntity<List<Client>> getAllClients(@RequestHeader("sub") String sub) {
        //Validations
        Optional<User> optionalUser = userRepository.findById(Long.parseLong(sub));
        if(optionalUser.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(optionalUser.get().getClients().stream().toList());
    }

    @PostMapping("invoice")
    private ResponseEntity<Invoice> addInvoice(@RequestHeader("sub") String sub, @RequestBody InvoiceFormDto invoiceFormDto) {
        //Validations
        Optional<User> optionalUser = userRepository.findById(Long.parseLong(sub));
        if(optionalUser.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        if(invoiceFormDto.subtotal() < 0 || invoiceFormDto.total() < 0) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<Client> optionalClient = clientRepository.findById(invoiceFormDto.client().id());
        if(optionalClient.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        if(invoiceFormDto.products().isEmpty() && invoiceFormDto.services().isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Optional<Invoice> optionalInvoice = invoiceRepository.findByCode(invoiceFormDto.code());
        if(optionalInvoice.isPresent()) {
            if(Objects.equals(optionalInvoice.get().getUser(), optionalUser.get())) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        //Valid input
        Invoice invoiceToAdd = Invoice.builder()
                .code(invoiceFormDto.code())
                .iva(invoiceFormDto.iva())
                .subtotal(invoiceFormDto.subtotal())
                .totalPrice(invoiceFormDto.total())
                .invoiceProducts(new HashSet<>())
                .invoiceServices(new HashSet<>())
                .build();

        optionalUser.get().addInvoice(invoiceToAdd);
        optionalClient.get().addInvoice(invoiceToAdd);
        Invoice savedInvoice = invoiceRepository.save(invoiceToAdd);

        if(!invoiceFormDto.products().isEmpty()){
            try{
                addProductsToInvoice(savedInvoice, invoiceFormDto.products());
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .header("Message", e.getMessage()).build();
            }

        }
        if(!invoiceFormDto.services().isEmpty()){
            try{
                addServiceToInvoice(savedInvoice, invoiceFormDto.services());
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .header("Message", e.getMessage()).build();
            }
        }

        return ResponseEntity.ok(savedInvoice);
    }

    @GetMapping("invoices")
    private ResponseEntity<List<Invoice>> getAllInvoices(@RequestHeader("sub") String sub) {
        Optional<User> optionalUser = userRepository.findById(Long.parseLong(sub));
        if(optionalUser.isEmpty()) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(optionalUser.get().getInvoices().stream().toList());
    }

    private void addProductsToInvoice(Invoice savedInvoice, List<InvoiceProductDto> invoiceProductDtoList) throws Exception {
        for(var invoiceProductDto : invoiceProductDtoList) {
            Optional<Product> optionalProduct = productRepository.findById(invoiceProductDto.product().id());
            if(optionalProduct.isEmpty()) throw new Exception("Hay productos en la factura que no estan registrados en la base de datos");
            InvoiceProduct invoiceProduct = new InvoiceProduct();
            invoiceProduct.setQuantity(invoiceProductDto.quantity());

            InvoiceProductId id = new InvoiceProductId();
            id.setIdProducts(optionalProduct.get().getId());
            id.setIdInvoice(savedInvoice.getId());
            invoiceProduct.setId(id);

            optionalProduct.get().addInvoice(invoiceProduct);
            savedInvoice.addInvoiceProduct(invoiceProduct);

            invoiceProductRepository.save(invoiceProduct);
        }
    }

    private void addServiceToInvoice(Invoice savedInvoice, List<InvoiceServiceDto> invoiceServiceList) throws Exception {
        for(var invoiceProductDto : invoiceServiceList) {
            Optional<Service> optionalService = serviceRepository.findById(invoiceProductDto.service().id());
            if(optionalService.isEmpty()) throw new Exception("Hay servicios en la factura que no estan registrados en la base de datos");
            InvoiceService invoiceService = new InvoiceService();
            invoiceService.setHourAmount(Long.valueOf(invoiceProductDto.hourAmount()));

            InvoiceServiceId id = new InvoiceServiceId();
            id.setIdService(optionalService.get().getId());
            id.setIdInvoice(savedInvoice.getId());
            invoiceService.setId(id);

            optionalService.get().addInvoice(invoiceService);
            savedInvoice.addInvoiceService(invoiceService);

            invoiceServiceRepository.save(invoiceService);
        }
    }
}
