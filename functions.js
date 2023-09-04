// Function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log(results);
      }
    });
}