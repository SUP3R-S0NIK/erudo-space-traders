import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import LoginPage from './login.page'
import { act } from 'react-dom/test-utils'
import { AuthProvider } from '../../hooks/use-auth.hook'
import { BrowserRouter } from 'react-router-dom'
import AxiosMock from '../../test-utils/mockAxios.test-util'


describe('LoginPage', () => {
  beforeAll(() => {
    AxiosMock.init();
  })
  beforeEach(() => {
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders LoginPage', () => {
    render(<LoginPage />)
    const pageTitlePart1 = screen.getByText('Bienvenue sur')
    const pageTitlePart2 = screen.getByText('Partition')
    const logoImage = screen.getByAltText('logo partition')
    expect(pageTitlePart1).toBeInTheDocument()
    expect(pageTitlePart2).toBeInTheDocument()
    expect(logoImage).toBeInTheDocument()
  })

  test('wrong id gives rejection from API', async () => {
    render(
      <BrowserRouter>
        <AuthProvider userData={null}>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>,
    )

    const usernameInput = screen.getByLabelText('Identifiant')
    const passWordInput = screen.getByLabelText('Mot de passe')
    const submitBtn = screen.getByTestId('submit')
    const rememberMe = false
    const form = screen.getByRole('form')

    await waitFor(() => {
      fireEvent.change(usernameInput, {
        target: {
          value: 'noterudo',
        },
      })

      fireEvent.change(passWordInput, {
        target: {
          value: 'erduo',
        },
      })

      fireEvent.click(submitBtn)
    })

    // await waitFor(() => expect(mockedAxios.post).toHaveBeenCalled())
  })



})
