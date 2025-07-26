// check_teacher_login.js

(function () {
  const teacherName = localStorage.getItem('teacherName');
  const teacherClass = localStorage.getItem('teacherClass');

  if (!teacherName || !teacherClass) {
    alert('Access denied! Please login first.');
    window.location.href = 'teacher_login.html';
  }
})();
