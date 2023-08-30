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
    </QueryClientProvider>
}

export default App
