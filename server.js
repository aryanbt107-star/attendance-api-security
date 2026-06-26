const express = require('express');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const employeeRoutes = require('./routes/employee');
const salaryRoutes = require('./routes/salary');
const leaveRoutes = require('./routes/leave');
const applyLeaveRoutes = require('./routes/applyleave');
const salarySlipRoutes = require('./routes/salaryslip');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());   // IMPORTANT

app.use(session({
    secret: 'mySecretKey123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

app.use('/auth', authRoutes);

app.use('/attendance', authMiddleware, attendanceRoutes);
app.use('/employee', authMiddleware, employeeRoutes);
app.use('/salary', authMiddleware, salaryRoutes);
app.use('/leave', authMiddleware, leaveRoutes);
app.use('/applyleave', authMiddleware, applyLeaveRoutes);
app.use('/salaryslip', authMiddleware, salarySlipRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});