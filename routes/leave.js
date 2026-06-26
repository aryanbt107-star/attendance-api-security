const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {

    res.json({
        message: 'Leave API Working'
    });

});

router.get('/:employeeId', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;

        const [employee] = await db.query(
            `
            SELECT empname
            FROM employee
            WHERE employee_id = ?
            `,
            [employeeId]
        );

        const [leaveData] = await db.query(
            `
            SELECT
                COUNT(*) AS totalApplications,
                SUM(leavenoofdays) AS totalLeaveDays
            FROM leaveapply
            WHERE empid = ?
            `,
            [employeeId]
        );

        const [leaveTypes] = await db.query(
            `
            SELECT
                lt.leavetype,
                SUM(la.leavenoofdays) AS days
            FROM leaveapply la
            JOIN leavetype lt
                ON la.leavetypeid = lt.leavetype_id
            WHERE la.empid = ?
            GROUP BY lt.leavetype
            `,
            [employeeId]
        );

        res.json({
            employeeId: employeeId,
            employeeName: employee.length > 0 ? employee[0].empname : 'Unknown',
            totalApplications: leaveData[0].totalApplications || 0,
            totalLeaveDays: leaveData[0].totalLeaveDays || 0,
            leaveTypes: leaveTypes
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;