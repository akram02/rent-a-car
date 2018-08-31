package com.letsgo.rental.repository;

import com.letsgo.rental.domain.FleetOwner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FleetOwner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FleetOwnerRepository extends JpaRepository<FleetOwner, Long> {

}
