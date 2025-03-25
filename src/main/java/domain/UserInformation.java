/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

/**
 *
 * @author kevin
 * 
 * 
 * TODO: Address things
 */
public class UserInformation {
    private String businessName;
    private String bankAccountNum;
    private String GstNumber;
    private String shippingAddress;
    private String mailingAddress;
    private String email;
    private String phoneNum;

    public UserInformation(String businessName, String bankAccountNum, String GstNumber, String shippingAddress, String mailingAddress, String email, String phoneNum) {
        this.businessName = businessName;
        this.bankAccountNum = bankAccountNum;
        this.GstNumber = GstNumber;
        this.shippingAddress = shippingAddress;
        this.mailingAddress = mailingAddress;
        this.email = email;
        this.phoneNum = phoneNum;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBankAccountNum() {
        return bankAccountNum;
    }

    public void setBankAccountNum(String bankAccountNum) {
        this.bankAccountNum = bankAccountNum;
    }

    public String getGstNumber() {
        return GstNumber;
    }

    public void setGstNumber(String GstNumber) {
        this.GstNumber = GstNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }
    
    public String getShippingAddress(){
        return shippingAddress;
    }
    
    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    
    public String getMailingAddress(){
        return mailingAddress;
    }
    
    public void setMailingAddress(String mailingAddress){ 
        this.mailingAddress = mailingAddress;
    }

    @Override
    public String toString() {
        return "UserInformation(" +
               "businessName='" + businessName + '\'' +
               ", bankAccountNum='" + bankAccountNum + '\'' +
               ", GstNumber='" + GstNumber + '\'' +
               ", shippingAddress='" + shippingAddress + '\'' +
               ", email='" + email + '\'' +
               ", phoneNum='" + phoneNum + '\'' +
               ')';
    }

    
    
    
}
