/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

/**
 *
 * @author kevin
 */
public class Address {

    private Integer addressId;
    private String streetAddress1;
    private String streetAddress2;
    private String city;
    private String region;
    private Integer postCode;
    private String country;

    public Address() {

    }

    public Address(Integer addressId, String streetAddress1, String streetAddress2, String city, String region, Integer postCode, String country) {
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

    public Integer getPostCode() {
        return postCode;
    }

    public void setPostCode(Integer postCode) {
        this.postCode = postCode;
    }
    
    public String country(){
        return country;
    }
    
    public void setCountry(String country) {
        this.country = country;
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
