package com.flight.flightdetails.service;

import java.util.List;

import com.flight.flightdetails.model.Flight;
import com.flight.flightdetails.repository.FlightRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepo flightRepo;

    @Override
    public Flight setFlightDetails(Flight flight) {

        return flightRepo.save(flight);
    }

    @Override
    public Flight getFlightById(long id) {

        return flightRepo.findById(id);
    }

    @Override
    public Flight getFlightByFlightNumber(String flightNumber) {

        return flightRepo.findByFlightNumber(flightNumber);
    }

    @Override
    public List<Flight> getAllFlights() {

        return flightRepo.findAll();
    }

    @Override
    public Flight updateFlightByFlightNumber(Flight flight) {

        return flightRepo.save(flight);
    }

    @Override
    public void deleteFlightByFlightNumber(String flightNumber) {

        flightRepo.deleteByFlightNumber(flightNumber);
    }

    @Override
    public List<Flight> getFlightBySourceAndDestination(String source, String destination) {

        return flightRepo.findBySourceAndDestination(source, destination);
    }

}