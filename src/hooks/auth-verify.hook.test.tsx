import {tokenIsExpired} from './auth-verify.hook';

describe('authVerify', () => {
    /*
        AuthVerify
        tokenIsExpired
    */

    it('should be false token is not valid', () => {
        let token = null;
        expect(tokenIsExpired(token)).toBe(false);

        token = 0;
        expect(tokenIsExpired(token)).toBe(false);

        token = undefined;
        expect(tokenIsExpired(token)).toBe(false);

        token = true;
        expect(tokenIsExpired(token)).toBe(false);

        token = false;
        expect(tokenIsExpired(token)).toBe(false);
        
        token = "string";
        expect(tokenIsExpired(token)).toBe(false);

        token = {};
        expect(tokenIsExpired(token)).toBe(false);
    });

    it('should be false when token is expired', () => {
        const token = {exp: 1050685390};
        expect(tokenIsExpired(token)).toBe(false);
    });

    // Will only work until year 3000 but we wont be alive until then i think
    it('should be true when token exp is valid', () => {
        const token = {exp: 32512986190};
        expect(tokenIsExpired(token)).toBe(false);
    });
});
