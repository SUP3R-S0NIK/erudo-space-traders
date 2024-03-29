import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import LoginForm from './login.form';
import {act} from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';

describe('LoginForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Not enter a login should trigger validation schema', async () => {
        render(
            <BrowserRouter>
                <LoginForm handlerSubmit={jest.fn()} loading={false}/>
            </BrowserRouter>,
        );
        const loginInput = screen.getByLabelText('Identifiant');
        fireEvent.change(loginInput, {target: {value: ''}});

        const passwordInput = screen.getByLabelText('Mot de passe');
        fireEvent.change(passwordInput, {target: {value: 'password'}});

        const submitButton = screen.getByTestId('submit');
        act(() => {
            submitButton.click();
        });
        await waitFor(() => {
            expect(screen.getByText("L'identifiant est obligatoire")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByText('Le mot de passe est obligatoire')).not.toBeInTheDocument();
        });
    });

    test('Not enter a password should trigger validation schema', async () => {
        render(
            <BrowserRouter>
                <LoginForm handlerSubmit={jest.fn()} loading={false}/>
            </BrowserRouter>,
        );
        const loginInput = screen.getByLabelText('Identifiant');
        fireEvent.change(loginInput, {target: {value: 'login'}});

        const passwordInput = screen.getByLabelText('Mot de passe');
        fireEvent.change(passwordInput, {target: {value: ''}});

        const submitButton = screen.getByTestId('submit');
        act(() => {
            submitButton.click();
        });

        await waitFor(() => {
            expect(screen.queryByText("L'identifiant est obligatoire")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByText('Le mot de passe est obligatoire')).toBeInTheDocument();
        });
    });

    test('Click on the eye Password button should call setShowPassword with true', async () => {
        await act(async () => {
            const init = () => {
                render(
                    <BrowserRouter>
                        <LoginForm handlerSubmit={jest.fn()} loading={false}/>
                    </BrowserRouter>,
                );
            };
            init();
        });

        const eyePasswordButton = screen.getByTestId('eye-password');

        const passwordInput = screen.getByLabelText('Mot de passe');

        await act(async () => {
            eyePasswordButton.click();
        });

        expect(passwordInput).toHaveAttribute('type', 'text');
    });
});
