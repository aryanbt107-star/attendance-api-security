const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/:employeeId', async (req, res) => {

    try {

        const employeeId = req.params.employeeId;

        const [rows] = await db.query(
            `
            SELECT
                employee_id,
                empcode,
                empname,
                empcontactno,
                empcontactemail,
                joiningdate,
                departmentid,
                companybranchid,
                resiaddress,
                dateofbirth,
                ismarried,
                fathername,
                bloodgroup
            FROM employee
            WHERE employee_id = ?
            `,
            [employeeId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        const employee = rows[0];

        res.json({
            employeeId: employee.employee_id,
            employeeCode: employee.empcode,
            employeeName: employee.empname,
            contactNumber: employee.empcontactno,
            email: employee.empcontactemail,
            joiningDate: employee.joiningdate,
            departmentId: employee.departmentid,
            branchId: employee.companybranchid,
            address: employee.resiaddress,
            dateOfBirth: employee.dateofbirth,
            maritalStatus: employee.ismarried ? 'Married' : 'Single',
            fatherName: employee.fathername,
            bloodGroup: employee.bloodgroup
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
module.exports = router;