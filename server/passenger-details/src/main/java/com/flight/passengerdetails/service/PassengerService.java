package com.flight.passengerdetails.service;

import java.util.List;

import com.flight.passengerdetails.model.Passenger;

public interface PassengerService {

    public void setAllPassengers(List<Passenger> passengerList);

    public Passenger setPassengers(Passenger passenger);

    public List<Passenger> getAllPassengers();

    public Passenger getPassengersById(long id);

    public List<Passenger> getPassengerByFirstNameAndLastName(String firstName, String lastName);

    public List<Passenger> getPassengerByFirstName(String firstName);

    public Passenger updateById(Passenger passenger);

    public Passenger updateByFirstName(Passenger passenger);

    public void deleteById(long id);

}