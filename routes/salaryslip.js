const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
    res.json({
        message: 'Salary Slip API Working'
    });
});

router.get('/:employeeId/:month', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;
        const month = req.params.month;

        // Salary Slip Details
        const [salaryRows] = await db.query(
            `
            SELECT
                s.salaryslip_id,
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

        if (salaryRows.length === 0) {

            return res.json({
                message: 'No salary slip found'
            });

        }

        const salarySlipId = salaryRows[0].salaryslip_id;

        // Allowances
        const [allowances] = await db.query(
            `
            SELECT
                a.allowancename,
                sa.ssallowanceamount
            FROM salaryslip_allowance sa
            JOIN allowance a
                ON sa.allowanceid = a.allowance_id
            WHERE sa.salaryslipattendanceid = ?
            AND sa.ssallowanceamount > 0
            `,
            [salarySlipId]
        );

        // Deductions
        const [deductions] = await db.query(
            `
            SELECT
                d.deductionname,
                sd.ssdeductionamount
            FROM salaryslip_deduction sd
            JOIN deduction d
                ON sd.deductionid = d.deduction_id
           WHERE sd.salaryslipattendanceid = ?
           AND sd.ssdeductionamount > 0
            `,
            [salarySlipId]
        );

        res.json({
            employeeId: salaryRows[0].empid,
            employeeName: salaryRows[0].empname,
            month: salaryRows[0].salofmonth,
            basicSalary: salaryRows[0].basicsalary,
            finalSalary: salaryRows[0].finalsalary,
            presentDays: salaryRows[0].presentdays,
            monthlyDays: salaryRows[0].monthlydays,
            allowances,
            deductions
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;