/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import java.util.Objects;
import net.sf.oval.constraint.Email;
import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotNull;

/**
 *
 * @author kevin
 * 
 * 
 * TODO: Add address fields 
 */
public class Client {
    private Integer clientID;
    private Integer addressID; 
    private String name;
    private String email;
    private String phone;
    
    public Client(){
        
    }
    
    public Client(Integer clientID, Integer addressID, String name, String email, String phone){
        this.clientID = clientID;
        this.addressID = addressID;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public Integer getClientID() {
        return clientID;
    }

    public void setClientID(Integer clientID) {
        this.clientID = clientID;
    }
    
    public Integer getAddressID() {
        return addressID;
    }
    
    public void setAddressID(Integer addressID) {
        this.addressID = addressID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }


    @Override
    public int hashCode() {
        int hash = 7;
        hash = 31 * hash + Objects.hashCode(this.clientID);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Client other = (Client) obj;
        return Objects.equals(this.clientID, other.clientID);
    }

    
    @Override
    public String toString() {
        return "Client(" +
               "clientID=" + clientID +
               "addressID=" + addressID + '\'' +
               ", name='" + name + '\'' +
               ", email='" + email + '\'' +
               ", phone='" + phone + '\'' +
               ')';
    }
    
}
