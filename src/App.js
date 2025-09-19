import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserManagementPage from './pages/UserManagementPage';
import CourseManagementPage from './pages/CourseManagementPage';
import EnrollmentPage from './pages/EnrollmentPage';
import AssessmentPage from './pages/AssessmentPage';
import NotificationsPage from './pages/NotificationsPage';
import './App.css';

// ErrorBoundary component to catch runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <nav>
          <ul>
            <li><Link to="/" aria-label="User Management">User Management</Link></li>
            <li><Link to="/courses" aria-label="Course Management">Course Management</Link></li>
            <li><Link to="/enrollments" aria-label="Enrollment">Enrollment</Link></li>
            <li><Link to="/assessments" aria-label="Assessment">Assessment</Link></li>
            <li><Link to="/notifications" aria-label="Notifications">Notifications</Link></li>
          </ul>
        </nav>
       
        <Routes>
          <Route path="/" element={<UserManagementPage />} />
          <Route path="/courses" element={<CourseManagementPage />} />
          <Route path="/enrollments" element={<EnrollmentPage />} />
          <Route path="/assessments" element={<AssessmentPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          {/* Fallback route for undefined paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
