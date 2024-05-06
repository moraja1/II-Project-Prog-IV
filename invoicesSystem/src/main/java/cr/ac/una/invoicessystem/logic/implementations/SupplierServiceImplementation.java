package cr.ac.una.invoicessystem.logic.implementations;

import cr.ac.una.invoicessystem.data.dto.LoginFormDto;
import cr.ac.una.invoicessystem.data.entities.Supplier;
import cr.ac.una.invoicessystem.data.repositories.SupplierRepository;
import cr.ac.una.invoicessystem.logic.UserService;

import java.util.Optional;

public class SupplierServiceImplementation implements UserService {
    private final SupplierRepository supplierRepository;

    public SupplierServiceImplementation(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public boolean isAuthorized(LoginFormDto loginFormDto) {
        Optional<Supplier> persistedSupplier = supplierRepository.FindByNaturalIdAndAndPass(loginFormDto.username(), loginFormDto.password());

        if(persistedSupplier.isEmpty()) return false;
        return persistedSupplier.get().getHasAccess();
    }
}
