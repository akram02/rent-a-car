package com.letsgo.rental.web.rest;

import com.letsgo.rental.GatewayApp;

import com.letsgo.rental.domain.CarType;
import com.letsgo.rental.repository.CarTypeRepository;
import com.letsgo.rental.service.CarTypeService;
import com.letsgo.rental.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.letsgo.rental.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CarTypeResource REST controller.
 *
 * @see CarTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class CarTypeResourceIntTest {

    private static final String DEFAULT_TYPE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_NAME = "BBBBBBBBBB";

    @Autowired
    private CarTypeRepository carTypeRepository;

    

    @Autowired
    private CarTypeService carTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCarTypeMockMvc;

    private CarType carType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarTypeResource carTypeResource = new CarTypeResource(carTypeService);
        this.restCarTypeMockMvc = MockMvcBuilders.standaloneSetup(carTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarType createEntity(EntityManager em) {
        CarType carType = new CarType()
            .typeName(DEFAULT_TYPE_NAME);
        return carType;
    }

    @Before
    public void initTest() {
        carType = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarType() throws Exception {
        int databaseSizeBeforeCreate = carTypeRepository.findAll().size();

        // Create the CarType
        restCarTypeMockMvc.perform(post("/api/car-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carType)))
            .andExpect(status().isCreated());

        // Validate the CarType in the database
        List<CarType> carTypeList = carTypeRepository.findAll();
        assertThat(carTypeList).hasSize(databaseSizeBeforeCreate + 1);
        CarType testCarType = carTypeList.get(carTypeList.size() - 1);
        assertThat(testCarType.getTypeName()).isEqualTo(DEFAULT_TYPE_NAME);
    }

    @Test
    @Transactional
    public void createCarTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carTypeRepository.findAll().size();

        // Create the CarType with an existing ID
        carType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarTypeMockMvc.perform(post("/api/car-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carType)))
            .andExpect(status().isBadRequest());

        // Validate the CarType in the database
        List<CarType> carTypeList = carTypeRepository.findAll();
        assertThat(carTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTypeNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = carTypeRepository.findAll().size();
        // set the field null
        carType.setTypeName(null);

        // Create the CarType, which fails.

        restCarTypeMockMvc.perform(post("/api/car-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carType)))
            .andExpect(status().isBadRequest());

        List<CarType> carTypeList = carTypeRepository.findAll();
        assertThat(carTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCarTypes() throws Exception {
        // Initialize the database
        carTypeRepository.saveAndFlush(carType);

        // Get all the carTypeList
        restCarTypeMockMvc.perform(get("/api/car-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carType.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeName").value(hasItem(DEFAULT_TYPE_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getCarType() throws Exception {
        // Initialize the database
        carTypeRepository.saveAndFlush(carType);

        // Get the carType
        restCarTypeMockMvc.perform(get("/api/car-types/{id}", carType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carType.getId().intValue()))
            .andExpect(jsonPath("$.typeName").value(DEFAULT_TYPE_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCarType() throws Exception {
        // Get the carType
        restCarTypeMockMvc.perform(get("/api/car-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarType() throws Exception {
        // Initialize the database
        carTypeService.save(carType);

        int databaseSizeBeforeUpdate = carTypeRepository.findAll().size();

        // Update the carType
        CarType updatedCarType = carTypeRepository.findById(carType.getId()).get();
        // Disconnect from session so that the updates on updatedCarType are not directly saved in db
        em.detach(updatedCarType);
        updatedCarType
            .typeName(UPDATED_TYPE_NAME);

        restCarTypeMockMvc.perform(put("/api/car-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarType)))
            .andExpect(status().isOk());

        // Validate the CarType in the database
        List<CarType> carTypeList = carTypeRepository.findAll();
        assertThat(carTypeList).hasSize(databaseSizeBeforeUpdate);
        CarType testCarType = carTypeList.get(carTypeList.size() - 1);
        assertThat(testCarType.getTypeName()).isEqualTo(UPDATED_TYPE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCarType() throws Exception {
        int databaseSizeBeforeUpdate = carTypeRepository.findAll().size();

        // Create the CarType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCarTypeMockMvc.perform(put("/api/car-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carType)))
            .andExpect(status().isBadRequest());

        // Validate the CarType in the database
        List<CarType> carTypeList = carTypeRepository.findAll();
        assertThat(carTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarType() throws Exception {
        // Initialize the database
        carTypeService.save(carType);

        int databaseSizeBeforeDelete = carTypeRepository.findAll().size();

        // Get the carType
        restCarTypeMockMvc.perform(delete("/api/car-types/{id}", carType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CarType> carTypeList = carTypeRepository.findAll();
        assertThat(carTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarType.class);
        CarType carType1 = new CarType();
        carType1.setId(1L);
        CarType carType2 = new CarType();
        carType2.setId(carType1.getId());
        assertThat(carType1).isEqualTo(carType2);
        carType2.setId(2L);
        assertThat(carType1).isNotEqualTo(carType2);
        carType1.setId(null);
        assertThat(carType1).isNotEqualTo(carType2);
    }
}
