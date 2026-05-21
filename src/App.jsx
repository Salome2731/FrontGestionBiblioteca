import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Layout from "./layout/Layout.jsx";
import {SidebarProvider} from "./context/SidebarContext.jsx";
import {Toaster} from "sonner";

function App() {
    return (
        <>
            <BrowserRouter>
                <SidebarProvider>
                    <Toaster richColors position={"top-right"}/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/app/users" replace />} />

                        <Route path={"/app/*"} element={<Layout/>}/>
                    </Routes>
                </SidebarProvider>
            </BrowserRouter>
        </>
    )
}

export default App