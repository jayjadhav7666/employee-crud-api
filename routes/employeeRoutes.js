const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id, req.body);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json(employee);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        if (
            error.message.includes(
                'employees_email_key'
            )
        ) {

            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        res.status(500).json({ message: error.message });
    }
});

router.post('/bulk', async (req, res) => {

    try {

        const employees = await Employee.bulkCreate(
            req.body
        );

        res.status(201).json({
            message: 'Employees created successfully',
            employees
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.update(req.params.id, req.body);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json({ message: 'Employee updated successfully', employee });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.delete(req.params.id);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json({ message: 'Employee deleted successfully', employee });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;