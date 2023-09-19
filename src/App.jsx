import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import GlobalStyles from "./styles/GlobalStyles"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Cabin from "./pages/Cabins"
import Account from "./pages/Account"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import PageNotFound from "./pages/PageNotFound"
import Users from "./pages/Users"
import AppLayout from "./ui/AppLayout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid'
import Booking from "./pages/Booking"
import CheckIn from "./pages/CheckIn"
import OnSuccess from "./features/check-in-out/OnSuccess"
import ProtectedRoute from "./ui/ProtectedRoute"
import DarkModeProvider from "./context/DarkModeContext"
import Guests from "./pages/Guests"
import CreateBookingForm from "./features/bookings/CreateBookingForm"
import AddBooking from "./features/bookings/AddBooking"
// sets up the cache for the remote state behind the scene.
const queryClient = new QueryClient({
  // configuring the default options for react-query
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
})

function App() {
  return (
    <DarkModeProvider>
        <QueryClientProvider client={queryClient} >
            <ReactQueryDevtools initialIsOpen = {false} />
            <GlobalStyles/>
            <StyleSheetManager shouldForwardProp = {(prop) => isPropValid(prop)}>
              <BrowserRouter>
                  <Routes>
                    <Route element = {
                      // Authorization
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>

                    }>
                        <Route index element = {<Navigate replace to = "/dashboard" />} />
                        <Route path="/dashboard" element = {<Dashboard />} />
                        <Route path="/bookings" element = {<Bookings />} />
                        <Route path="/bookings/createupdate" element = {<AddBooking />} />
                        <Route path="/bookings/createupdate/:id" element = {<AddBooking />} />
                        <Route path="/bookings/:id" element = {<Booking />} />
                        <Route path="/guests" element = {<Guests />} />
                        <Route path="/checkin/:id" element = {<CheckIn />} />
                        <Route path="/checkin/:id/success" element = {<OnSuccess action= "Checked In" />} />
                        <Route path="/checkout/:id/success" element = {<OnSuccess action= "Checked Out"/>} />
                        <Route path="/verifyEmail" element = {<OnSuccess action= "signup"/>} />
                        <Route path="/cabins" element = {<Cabin />} />
                        <Route path="/account" element = {<Account />} />
                        <Route path="/users" element = {<Users />} />
                        <Route path="/settings" element = {<Settings />} />
                    </Route>
                    <Route path="/login" element = {<Login />} />
                    <Route path = "/*" element = {<PageNotFound />} />
                  </Routes>
              </BrowserRouter>
            </StyleSheetManager>
            <Toaster position="top-center" gutter={12} containerStyle={{margin: "8px"}} toastOptions={{
              success: {
                duration: 3000
              },
              error: {
                duration: 5000
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)"
              }
            }} />
          </QueryClientProvider>
  </DarkModeProvider>
    
) 
    
}

export default App
