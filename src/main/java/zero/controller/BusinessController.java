package zero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zero.domain.Business;
import zero.repository.BusinessRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/businesses")
public class BusinessController {

    @Autowired
    private BusinessRepository businessRepo;

    @GetMapping
    public List<Business> getAllBusinesses() {
        return businessRepo.findByDeletedFalse(); // or findAllNotDeleted()
    }


    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusinessById(@PathVariable Long id) {
        return businessRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Business createBusiness(@RequestBody Business business) {
        System.out.println("Creating new business: " + business);
        return businessRepo.save(business);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Business> updateBusiness(@PathVariable Long id, @RequestBody Business updatedBusiness) {
        return businessRepo.findById(id).map(business -> {
            business.setBusinessName(updatedBusiness.getBusinessName());
            business.setAddress(updatedBusiness.getAddress());
            business.setBankAccountNumber(updatedBusiness.getBankAccountNumber());
            business.setGstNumber(updatedBusiness.getGstNumber());
            business.setEmail(updatedBusiness.getEmail());
            business.setPhone(updatedBusiness.getPhone());
            business.setWebsiteLink(updatedBusiness.getWebsiteLink());
            //TODO add logo things
            return ResponseEntity.ok(businessRepo.save(business));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(@PathVariable Long id) {
        Optional<Business> optionalBusiness = businessRepo.findById(id);
        if (optionalBusiness.isPresent()) {
            Business business = optionalBusiness.get();
            business.setDeleted(true);
            businessRepo.save(business);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
