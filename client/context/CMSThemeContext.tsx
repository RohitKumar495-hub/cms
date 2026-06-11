'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CMSThemeContextType {
    theme: string
    handleTheme : () => void
}

const CMSThemeContext = createContext<CMSThemeContextType | undefined>(undefined)

interface CMSThemeContextProvider {
    children : ReactNode
}


export const CMSThemeProvider = ({ children } : CMSThemeContextProvider ) => {

    const [ theme, setTheme ] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')

        if(savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleTheme = () => {

        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return (
        <CMSThemeContext.Provider value={{
            theme,
            handleTheme
        }}>
            {children}
        </CMSThemeContext.Provider>
    )
}

export const useCMSTheme = () => {
    const context = useContext(CMSThemeContext)

    if(!context) {
        throw new Error("useCMSTheme must be used inside CMSThemeProvider")
    }

    return context
}

export default CMSThemeContext