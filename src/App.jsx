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
  return <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen = {false} />
      <GlobalStyles/>
      <StyleSheetManager shouldForwardProp = {(prop) => isPropValid(prop)}>
        <BrowserRouter>
            <Routes>
              <Route element = {<AppLayout />}>
                  <Route index element = {<Navigate replace to = "/dashboard" />} />
                  <Route path="/dashboard" element = {<Dashboard />} />
                  <Route path="/bookings" element = {<Bookings />} />
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
}

export default App
