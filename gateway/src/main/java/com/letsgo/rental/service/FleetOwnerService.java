package com.letsgo.rental.service;

import com.letsgo.rental.domain.FleetOwner;
import com.letsgo.rental.repository.FleetOwnerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing FleetOwner.
 */
@Service
@Transactional
public class FleetOwnerService {

    private final Logger log = LoggerFactory.getLogger(FleetOwnerService.class);

    private final FleetOwnerRepository fleetOwnerRepository;

    public FleetOwnerService(FleetOwnerRepository fleetOwnerRepository) {
        this.fleetOwnerRepository = fleetOwnerRepository;
    }

    /**
     * Save a fleetOwner.
     *
     * @param fleetOwner the entity to save
     * @return the persisted entity
     */
    public FleetOwner save(FleetOwner fleetOwner) {
        log.debug("Request to save FleetOwner : {}", fleetOwner);        return fleetOwnerRepository.save(fleetOwner);
    }

    /**
     * Get all the fleetOwners.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FleetOwner> findAll(Pageable pageable) {
        log.debug("Request to get all FleetOwners");
        return fleetOwnerRepository.findAll(pageable);
    }


    /**
     * Get one fleetOwner by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FleetOwner> findOne(Long id) {
        log.debug("Request to get FleetOwner : {}", id);
        return fleetOwnerRepository.findById(id);
    }

    /**
     * Delete the fleetOwner by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FleetOwner : {}", id);
        fleetOwnerRepository.deleteById(id);
    }
}
