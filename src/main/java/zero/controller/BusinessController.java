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
        return businessRepo.findAll();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Business> getBusinessById(@PathVariable Long id) {
//        return businessRepo.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public Business createBusiness(@RequestBody Business business) {
//        return businessRepo.save(business);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Business> updateBusiness(@PathVariable Long id, @RequestBody Business updatedBusiness) {
//        return businessRepo.findById(id).map(business -> {
//            business.setBusinessName(updatedBusiness.getBusinessName());
//            business.setAddress(updatedBusiness.getAddress());
//            // Update any other fields you need
//            return ResponseEntity.ok(businessRepo.save(business));
//        }).orElse(ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteBusiness(@PathVariable Long id) {
//        if (businessRepo.existsById(id)) {
//            businessRepo.deleteById(id);
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.notFound().build();
//    }
}
