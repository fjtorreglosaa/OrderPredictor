import { Routes, Route, Navigate } from 'react-router-dom';
import { SalesPredictionPage } from '../orders/pages/SalesPredictionPage';
import { AppTheme } from '../theme/AppTheme';
import { NavBar } from '../shared/components/navigation/Bar/NavBar';

export const AppRouter = () => {

  return (
    <>
      <NavBar/>
      <AppTheme>
        <Routes>
            <Route path="/orders/prediction" element={<SalesPredictionPage />}/>
            <Route path="/" element={<Navigate to="/orders/prediction"/>}/>
        </Routes>
      </AppTheme> 
    </>
  )
}
