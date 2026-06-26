const express = require('express');
const router = express.Router();

const db = require('../db');

// All Employee Attendance
router.get('/', async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM attendance'
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// All Employee Month Wise Attendance
router.get('/month/:month', async (req, res) => {

    try {

        const month = req.params.month;

        const [rows] = await db.query(
            `SELECT *
             FROM attendance
             WHERE ofmonth = ?`,
            [month]
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
// All Employee Month and Branch Wise Attendance
router.get('/month/:month/branch/:branchId', async (req, res) => {

    try {

        const month = req.params.month;
        const branchId = req.params.branchId;

        const [rows] = await db.query(
            `SELECT *
             FROM attendance
             WHERE ofmonth = ?
             AND companybranchid = ?`,
            [month, branchId]
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
// Single Employee Attendance
router.get('/employee/:employeeId', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;

        const [rows] = await db.query(
            `SELECT *
             FROM attendance
             WHERE employeeid = ?`,
            [employeeId]
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
// Single Employee Month Wise Attendance
router.get('/employee/:employeeId/month/:month', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;
        const month = req.params.month;

        const [rows] = await db.query(
            `SELECT *
             FROM attendance
             WHERE employeeid = ?
             AND ofmonth = ?`,
            [employeeId, month]
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
// Single Employee Month and Branch Wise Attendance
router.get('/employee/:employeeId/month/:month/branch/:branchId', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;
        const month = req.params.month;
        const branchId = req.params.branchId;

        const [rows] = await db.query(
            `SELECT *
             FROM attendance
             WHERE employeeid = ?
             AND ofmonth = ?
             AND companybranchid = ?`,
            [employeeId, month, branchId]
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;