import {useLocalStorage} from './use-local-storage.hook';
import {renderHook} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

describe('useLocalStorage', () => {
    beforeEach(() => {
// Réinitialiser le localStorage avant chaque test
    localStorage.clear();
    });
    afterAll(() => {
// Réinitialiser le localStorage avant chaque test
    localStorage.clear();
    });

    it('should return the default value if the key is not found in localStorage', () => {
        const keyName = 'myKey';
        const defaultValue = 'myDefaultValue';
        const {result} = renderHook(() => useLocalStorage(keyName, defaultValue));

        expect(result.current[0]).toBe(defaultValue);
    });

    it('should return the value from localStorage if the key is found', () => {
        const keyName = 'myKey';
        const storedValue = 'myStoredValue';
        localStorage.setItem(keyName, JSON.stringify(storedValue));
        const {result} = renderHook(() => useLocalStorage(keyName, ''));

        expect(result.current[0]).toBe(storedValue);
    });

    it('should store the new value in localStorage when setValue is called', () => {
        const keyName = 'myKey';
        const defaultValue = 'myDefaultValue';
        const newValue = 'myNewValue';
        const {result} = renderHook(() => useLocalStorage(keyName, defaultValue));
        act(() => {
            result.current[1](newValue);
        });

        expect(localStorage.getItem(keyName)).toBe(JSON.stringify(newValue));
    });

    it('should update the storedValue when setValue is called', () => {
        const keyName = 'myKey';
        const defaultValue = 'myDefaultValue';
        const newValue = 'myNewValue';
        const {result} = renderHook(() => useLocalStorage(keyName, defaultValue));
        act(() => {
            result.current[1](newValue);
        });

        expect(result.current[0]).toBe(newValue);
    });
});
