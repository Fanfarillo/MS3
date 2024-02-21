package org.cswteams.ms3.rest;

import org.cswteams.ms3.control.vincoli.IConstraintController;
import org.cswteams.ms3.dto.ConfigConstraintDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/constraints/")
public class ConstraintRestEndpoint {
    @Autowired
    IConstraintController constraintController;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> readConstraints()  {
        return new ResponseEntity<>(constraintController.readConstraints(), HttpStatus.FOUND);
    }

    @RequestMapping(method = RequestMethod.GET, path = "configuration")
    public ResponseEntity<?> readConstraintsConfiguration()  {
        return new ResponseEntity<>(constraintController.readConfigConstraints(), HttpStatus.FOUND);
    }

    @RequestMapping(method = RequestMethod.POST, path = "configuration")
    public ResponseEntity<?> updateConstraintsConfiguration(@RequestBody() ConfigConstraintDTO constraintDTO) {
        if (constraintDTO != null) {
            return new ResponseEntity<>(constraintController.updateConstraints(constraintDTO), HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
