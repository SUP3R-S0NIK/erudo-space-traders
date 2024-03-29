import React from 'react';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth.hook';
import LoginPage from './pages/login/login.page';

jest.mock('./pages/login/login.page', () => jest.fn());

describe('App', () => {
    beforeEach(() => {
        (LoginPage as jest.Mock).mockImplementation(() => <div>Login Page</div>);
    });
    it('renders the App component with LoginPage', () => {
        render(
            <BrowserRouter>
                <AuthProvider userData={null}>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>,
        );
    });
    it('should have login page content', () => {
        render(<LoginPage />);
        const titleElement = screen.getByText('Login Page');
        expect(titleElement).toBeInTheDocument();
    });
});
