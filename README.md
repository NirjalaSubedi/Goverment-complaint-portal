# Government Complaint Portal / सरकारी उजुरी पोर्टल

A web-based complaint management system for citizens to submit complaints and government officers to manage them.

## 🆕 Recent Updates (December 29, 2025)

### Admin Dashboard Issue Fixed
✅ Fixed the issue where pending officer registrations were not showing on admin dashboard  
✅ Added comprehensive debugging and testing tools  
✅ Improved error handling and logging

**See [SUMMARY.md](SUMMARY.md) for detailed information about the fixes**

## 🧪 Testing & Debugging Tools

### Quick Status Check
Access this page to see all officer registrations and their status:
```
http://localhost/Goverment-complaint-portal/backend/check_officers.php
```

### Debug Admin Functions
Test page with multiple diagnostic tools:
```
http://localhost/Goverment-complaint-portal/frontend/test_admin.html
```

### Database Tests
Run SQL queries from `test_database.sql` in phpMyAdmin to verify database structure and data.

## 📋 Features

- **Citizen Portal**: Submit and track complaints
- **Officer Portal**: Review and manage complaints
- **Admin Portal**: Approve/reject officer registrations
- **Multi-language Support**: English and Nepali
- **Document Upload**: Support for complaint attachments and officer ID verification

## 🚀 Setup Instructions

1. **Install XAMPP**
   - Download and install XAMPP
   - Start Apache and MySQL services

2. **Setup Database**
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Create database: `goverment_complaint_portal`
   - Import database schema (if provided)

3. **Configure Application**
   - Place project in: `C:\xampp\htdocs\Goverment-complaint-portal`
   - Database credentials are in: `includes/databaseConnection.php`

4. **Access Application**
   ```
   Main Page: http://localhost/Goverment-complaint-portal/frontend/index1.html
   Login: http://localhost/Goverment-complaint-portal/frontend/login.html
   ```

## 🔧 Troubleshooting

If you encounter any issues, especially with the admin dashboard:

1. **Check Officer Status**  
   Visit: [check_officers.php](http://localhost/Goverment-complaint-portal/backend/check_officers.php)

2. **Run Tests**  
   Visit: [test_admin.html](http://localhost/Goverment-complaint-portal/frontend/test_admin.html)

3. **Read Troubleshooting Guide**  
   See: [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions

4. **Check Browser Console**  
   Press F12 → Console tab to see any JavaScript errors

## 📁 Project Structure

```
├── backend/
│   ├── adminverify.php      # Officer approval/rejection
│   ├── createuser.php       # User registration
│   ├── getuser.php          # Get user info
│   ├── login.php            # Authentication
│   ├── submitcomplaint.php  # Complaint submission
│   └── check_officers.php   # 🆕 Officer status checker
├── frontend/
│   ├── admindashboard.html  # Admin dashboard
│   ├── citizendashboard.html
│   ├── officerdasboard.html
│   ├── auth.html            # Registration page
│   ├── login.html
│   ├── test_admin.html      # 🆕 Debug page
│   └── [other pages]
├── includes/
│   └── databaseConnection.php
├── uploads/
│   ├── complaints/
│   └── officer_ids/
├── test_database.sql        # 🆕 Database test queries
├── TROUBLESHOOTING.md      # 🆕 Troubleshooting guide
└── SUMMARY.md              # 🆕 Recent fixes summary
```

## 👥 User Types

1. **Citizen**: Can submit and track complaints
2. **Officer**: Can view and manage assigned complaints  
   - Requires admin approval before first login
3. **Admin**: Can approve/reject officer registrations

## 🔐 Security Features

- Password hashing using PHP's `password_hash()`
- Prepared statements to prevent SQL injection
- Session-based authentication
- Officer approval workflow
- Document verification for officers

## 📝 Common Issues & Solutions

### "No pending officers" on Admin Dashboard

**Cause**: No officers have registered or they're already approved/rejected  
**Solution**: 
1. Create a test officer account
2. Check status at: check_officers.php
3. Clear browser cache and refresh

### Officer can't login after registration

**Cause**: Account is pending admin approval (this is expected behavior)  
**Solution**: Admin must approve the account from admin dashboard

### JSON Parse Error

**Cause**: PHP errors or extra output before JSON  
**Solution**: Already fixed in latest update. Clear browser cache.

## 🌐 URLs Reference

| Page | URL |
|------|-----|
| Home | http://localhost/Goverment-complaint-portal/frontend/index1.html |
| Login | http://localhost/Goverment-complaint-portal/frontend/login.html |
| Register | http://localhost/Goverment-complaint-portal/frontend/auth.html |
| Admin Dashboard | http://localhost/Goverment-complaint-portal/frontend/admindashboard.html |
| Check Officers | http://localhost/Goverment-complaint-portal/backend/check_officers.php |
| Test Admin | http://localhost/Goverment-complaint-portal/frontend/test_admin.html |
| phpMyAdmin | http://localhost/phpmyadmin |

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **Server**: Apache (via XAMPP)
- **Icons**: Google Material Icons

## 📞 Support

For issues or questions:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Check browser console (F12)
3. Use debug tools (test_admin.html, check_officers.php)
4. Review [SUMMARY.md](SUMMARY.md) for recent changes

---
**Last Updated**: December 29, 2025  
**Version**: 1.1 (Admin Dashboard Fix)
