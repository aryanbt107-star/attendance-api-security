const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/:employeeId/applications', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;

        const [rows] = await db.query(
            `
            SELECT
                la.leaveapply_id,
                lt.leavetype,
                la.fromdate,
                la.todate,
                la.leavenoofdays,
                la.leavereason,
                la.leavestatusid
            FROM leaveapply la
            JOIN leavetype lt
                ON la.leavetypeid = lt.leavetype_id
            WHERE la.empid = ?
            `,
            [employeeId]
        );

        if (rows.length === 0) {
            return res.json({
                message: 'No leave applications found'
            });
        }

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;