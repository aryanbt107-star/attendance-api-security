const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
    res.json({
        message: 'Monthly Salary API Working'
    });
});

router.get('/monthly/:employeeId/:month', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;
        const month = req.params.month;

        const [rows] = await db.query(
            `
            SELECT
                s.empid,
                e.empname,
                s.salofmonth,
                s.basicsalary,
                s.finalsalary,
                s.presentdays,
                s.monthlydays
            FROM salaryslip s
            JOIN employee e
                ON s.empid = e.employee_id
            WHERE s.empid = ?
            AND s.salofmonth = ?
            `,
            [employeeId, month]
        );

        if (rows.length === 0) {
            return res.json({
                message: 'No salary record found'
            });
        }

        res.json({
            employeeId: rows[0].empid,
            employeeName: rows[0].empname,
            month: rows[0].salofmonth,
            basicSalary: rows[0].basicsalary,
            finalSalary: rows[0].finalsalary,
            presentDays: rows[0].presentdays,
            monthlyDays: rows[0].monthlydays
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;