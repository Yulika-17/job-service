import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import FindJobsPage from "./FindJobsPage";
import ApplyJobPage from "./ApplyJobPage";
import FindTalentPage from "./FindTalentPage";
import CompanyPage from "./CompanyPage";
import PostedJobPage from "./PostedJobPage";
import JobHistoryPage from "./JobHistoryPage";
import TalentProfilePage from "./TalentProfilePage";
import PostJobPage from "./PostJobPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import JobPage from "./JobPage";
import ProtectedRoute from "../Services/ProtectedRoute";
import PublicRoute from "../Services/PublicRoute";
import Unauthorized from "./UnauthorizedPage";
import NotFoundPage from "./NotFoundPage";
import VerificatingTalentsPage from "./VerificatingTalentsPage";
import AnalyticsPanelPage from "./AnalyticsPanelPage";

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);
  return <BrowserRouter>
    <div className='relative'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/find-jobs' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><FindJobsPage /></ProtectedRoute>} />
        <Route path='/jobs/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobPage /></ProtectedRoute>} />
        <Route path='/apply-job/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><ApplyJobPage /></ProtectedRoute>} />
        <Route path='/find-talent' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><FindTalentPage /></ProtectedRoute>} />
        <Route path='/verify-talent' element={<ProtectedRoute allowedRoles={['UNIVERSITY', 'ADMIN']}><VerificatingTalentsPage /></ProtectedRoute>} />
        <Route path='/university/:name' element={<ProtectedRoute allowedRoles={['UNIVERSITY', 'ADMIN']}><AnalyticsPanelPage/></ProtectedRoute>} />
        <Route path='/talent-profile/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'UNIVERSITY', 'ADMIN']}><TalentProfilePage /></ProtectedRoute>} />
        <Route path='/company/:name' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><CompanyPage /></ProtectedRoute>} />
        <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobHistoryPage /></ProtectedRoute>} />
        <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><PostedJobPage /></ProtectedRoute>} />
        <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><PostJobPage /></ProtectedRoute>} />
        <Route path='/signup' element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path='/profile' element={<ProtectedRoute allowedRoles={['APPLICANT', 'UNIVERSITY', 'ADMIN', 'EMPLOYER']}><ProfilePage /></ProtectedRoute>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
}
export default AppRoutes;