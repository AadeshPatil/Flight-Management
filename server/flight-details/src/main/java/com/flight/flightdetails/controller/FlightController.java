package com.flight.flightdetails.controller;

import java.util.List;

import com.flight.flightdetails.exceptions.FlightNotFoundException;
import com.flight.flightdetails.model.Flight;
import com.flight.flightdetails.service.FlightServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/flights")
@CrossOrigin("http://localhost:4200")
public class FlightController {

    Logger logger = LoggerFactory.getLogger(FlightController.class);

    

    @Autowired
    private FlightServiceImpl flightServiceImpl;

    @GetMapping("/")
    @Operation(description = "Get Flights")
    @ApiResponse(responseCode = "200" , description = "Flights fetched successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when flight isn't present!!")
    public ResponseEntity<List<Flight>> getAllFlights() {

        

        try {
            List<Flight> list = flightServiceImpl.getAllFlights();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {

            

            e.printStackTrace();

            logger.info("[flightinfo] info message added");
            logger.warn("[flightinfo] warn message added");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{flightNumber}")
    @Operation(description = "Get Flight from FlightNumber")
    @ApiResponse(responseCode = "200" , description = "Flight fetched successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when flight isn't present!!")
    public ResponseEntity<Flight> getFlightById(@PathVariable("flightNumber") String flightNumber) {

        

        try {
            Flight flight = flightServiceImpl.getFlightByFlightNumber(flightNumber);
            return ResponseEntity.ok().body(flight);
        } catch (Exception e) {

            

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/std")
    @Operation(description = "Get Flights from std")
    @ApiResponse(responseCode = "200" , description = "Flight fetched successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when flight isn't present!!")
    public ResponseEntity<List<Flight>> getFlightBySourceAndDestination(@RequestParam(value = "source") String source,
            @RequestParam(value = "destination") String destination) {


        try {
            List<Flight> flight = flightServiceImpl.getFlightBySourceAndDestination(source, destination);

            return ResponseEntity.ok().body(flight);
        } catch (Exception e) {

      

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/")
    @Operation(description = "Post Flight")
    @ApiResponse(responseCode = "200" , description = "Flight posted successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when flight isn't present!!")
    public ResponseEntity<String> setFlight(@RequestBody Flight flight) {

        

        try {
            flightServiceImpl.setFlightDetails(flight);
            return ResponseEntity.ok().body("Flight Added Successfully");
        } catch (Exception e) {

            

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/{flightNumber}")
    @Operation(description = "Update Flight")
    @ApiResponse(responseCode = "200" , description = "Flight updated successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when flight isn't present!!")
    public ResponseEntity<String> updateFlight(@RequestBody Flight flight,
            @PathVariable("flightNumber") String flightNumber) throws FlightNotFoundException {


        try {
            List<Flight> list = flightServiceImpl.getAllFlights();
            boolean flag = false;
            for (Flight f : list) {
                if (f.getFlightNumber().equals(flightNumber)) {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                throw new FlightNotFoundException("FLight Does Not Exist!!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Warning: Flight with flight number " + flightNumber + " does not exists!");
        }
        Flight flight2 = flightServiceImpl.updateFlightByFlightNumber(flight);
        return ResponseEntity.ok().body("Flight Updated Successfully\nFlight Details are: \n" + flight2);
    }

    @DeleteMapping("/delete/{flightNumber}")
    @Operation(description = "Delete Flight")
    @ApiResponse(responseCode = "200" , description = "Flight deleted successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when flight isn't present!!")
    public ResponseEntity<String> deleteFlightByFlightNumber(@PathVariable("flightNumber") String flightNumber)
            throws FlightNotFoundException {

    

        try {
            List<Flight> list = flightServiceImpl.getAllFlights();
            boolean flag = false;
            for (Flight f : list) {
                if (f.getFlightNumber().equals(flightNumber)) {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                throw new FlightNotFoundException("FLight Does Not Exist!!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Warning: Flight with flight number " + flightNumber + " does not exists!");
        }

        flightServiceImpl.deleteFlightByFlightNumber(flightNumber);
        return ResponseEntity.ok("Flight Deleted Successfully");
    }
}