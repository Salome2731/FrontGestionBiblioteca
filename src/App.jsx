import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from "./layout/Layout.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Toaster } from "sonner";
import React, { Suspense } from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <SidebarProvider>
            <Toaster richColors position={"top-right"}/>
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-500 font-medium">
                Cargando el sistema...
              </div>
            }>
              <Routes>
                <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
                <Route path="/app/*" element={<Layout />} />
              </Routes>
            </Suspense>
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App