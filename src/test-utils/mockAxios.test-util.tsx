import { axiosCore } from '../services/http-core-service'

jest.mock('../services/http-core-service');
jest.mock('../services/auth.service');
const mockedAxios = axiosCore as jest.Mocked<typeof axiosCore>
class AxiosMock {
  public static init() {
    mockedAxios.post.mockImplementation((url, body) => {
      switch (url) {
        case '/api/authenticate':
          switch (
            (
              body as {
                username: string
                password: string
                rememberMe: boolean
              }
            ).username
          ) {
            case 'erudo':
              return Promise.resolve({
                data: {
                  token:
                    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlcnVkbyIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfRURJVF9DSEFSR0UsUk9MRV9VU0VSLFJPTEVfVVNFUl9NQU5BR0VNRU5UIiwiaWQiOjMsImZpcnN0TmFtZSI6IkVydWRvIiwibGFzdE5hbWUiOiJTQVMiLCJwcm9maWxlS2V5IjoiQURNSU4iLCJleHAiOjE3MTE3MzUzOTV9.414eMPgUoqm81paSuim5WtJLVXFBHm5HrVv7PPYmIw55Sb6X4dWBdL-lbEufwmNumoHKXrLFcTT7VBY14M31uQ',
                },
              })
            case 'noterudo':
              return Promise.reject(
                new Error('Identifiant ou mot de passe invalide'),
              )
            default:
              return Promise.reject(new Error('not found'))
          }
        default:
          return Promise.reject(new Error('not found'))
      }
    })

    return mockedAxios;
  }
}
export default AxiosMock
