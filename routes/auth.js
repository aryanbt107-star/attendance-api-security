const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// LOGIN
router.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const [rows] = await db.query(
            `
           SELECT
           id,
           username,
           password,
           roleid,
           statusid,
           delstatus
           FROM adminusers
           WHERE username = ?
           AND statusid = 1
           AND delstatus = 0
           LIMIT 1
            `,
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const admin = rows[0];

        // Optional checks
        if (admin.delstatus == 1) {
            return res.status(403).json({
                message: 'User account is deleted'
            });
        }

        if (admin.statusid != 1) {
            return res.status(403).json({
                message: 'User account is inactive'
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        // Create Session
        req.session.user = {
            id: admin.id,
            username: admin.username,
            roleId: admin.roleid
        };

        res.json({
            message: 'Login successful',
            user: {
                id: admin.id,
                username: admin.username,
                roleId: admin.roleid
            }
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// LOGOUT
router.get('/logout', (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).json({
                message: 'Logout failed'
            });
        }

        res.clearCookie('connect.sid');

        res.json({
            message: 'Logout successful'
        });

    });

});

module.exports = router;