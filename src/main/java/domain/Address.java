/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Integer addressId;
    
    @Column(name = "street_address1", nullable = false, length = 50)
    private String streetAddress1;
    
    @Column(name = "street_address2", length = 50)
    private String streetAddress2;
    
    @Column(name = "city", nullable = false, length = 50)
    private String city;
    
    @Column(name = "region", length = 50)
    private String region;
    
    @Column(name = "post_code", nullable = false, length = 10)
    private String postCode;  // Changed from Integer to String to match schema
    
    @Column(name = "country", nullable = false, length = 50)
    private String country;
    public Address() {

    }

    public Address(Integer addressId, String streetAddress1, String streetAddress2, String city, String region, String postCode, String country) {
        this.addressId = addressId;
        this.streetAddress1 = streetAddress1;
        this.streetAddress2 = streetAddress2;
        this.city = city;
        this.region = region;
        this.postCode = postCode;
        this.country = country;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public String getStreetAddress1() {
        return streetAddress1;
    }

    public void setStreetAddress1(String streetAddress1) {
        this.streetAddress1 = streetAddress1;
    }

    public String getStreetAddress2() {
        return streetAddress2;
    }

    public void getStreetAddress2(String streetAddress2) {
        this.streetAddress2 = streetAddress2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
    
    public String getRegion(){
        return region;
    }
    
    public void setRegion(String region) {
        this.region = region;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }
    
    public String getCountry(){
        return country;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(addressId, address.addressId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(addressId);
    }

    @Override
    public String toString() {
        return "Address{" + 
                "addressId=" + addressId + 
                ", streetAddress1='" + streetAddress1 + '\'' +
                ", streetAddress2='" + streetAddress2 + '\'' + 
                ", city='" + city + '\'' +
                ", region='" + region + '\'' + 
                ", postCode='" + postCode + '\'' + 
                ", country='" + country + '\'' + 
                '}';
    }

}
