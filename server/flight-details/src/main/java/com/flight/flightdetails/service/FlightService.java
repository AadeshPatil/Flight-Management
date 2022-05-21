package com.flight.flightdetails.service;

import java.util.List;

import com.flight.flightdetails.model.Flight;

public interface FlightService {
    public Flight setFlightDetails(Flight flight);

    public Flight getFlightById(long id);

    public Flight getFlightByFlightNumber(String flightNumber);

    public List<Flight> getFlightBySourceAndDestination(String source, String destination);

    public List<Flight> getAllFlights();

    public Flight updateFlightByFlightNumber(Flight flight);

    public void deleteFlightByFlightNumber(String flightNumber);

}