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
    private String streetAddress;
    private String suburb;
    private String city;
    private Integer postCode;

    
    public Address(){
        
    }
    
    public Address(String streetAddress, String suburb, String city, Integer postCode) {
        this.streetAddress = streetAddress;
        this.suburb = suburb;
        this.city = city;
        this.postCode = postCode;
    }
    
    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getSuburb() {
        return suburb;
    }

    public void setSuburb(String suburb) {
        this.suburb = suburb;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getPostCode() {
        return postCode;
    }

    public void setPostCode(Integer postCode) {
        this.postCode = postCode;
    }

    @Override
    public String toString() {
        return super.toString();    //TODO
    }
    
    
    
}
