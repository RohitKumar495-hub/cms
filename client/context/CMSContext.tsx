'use client'
import { createContext, ReactNode, SetStateAction, useContext, useState } from "react"

interface CMSContextType {
    openModal : boolean
    editId : string
    isSearching : string
    isEditing : boolean
    setIsEditing : React.Dispatch<SetStateAction<boolean>>
    setIsSearching : React.Dispatch<SetStateAction<string>>
    setOpenModal : React.Dispatch<SetStateAction<boolean>>
    setEditId : React.Dispatch<SetStateAction<string>>
}

const CMSContext = createContext<CMSContextType | undefined>(undefined)

interface CMSContextProvider {
    children : ReactNode
}

export const CMSProvider = ({ children } : CMSContextProvider ) => {
    const [ openModal, setOpenModal ] = useState(false)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ editId, setEditId ] = useState<string>('')
    const [ isSearching, setIsSearching ] = useState('')

    return (
        <CMSContext.Provider 
            value={{
                editId,
                setEditId,
                openModal,
                setOpenModal,
                isSearching,
                setIsSearching,
                isEditing,
                setIsEditing
            }}
        >
            {children}
        </CMSContext.Provider>
    )
    
}

export const useCMS = () => {
    const context = useContext(CMSContext)

    if(!context) {
        throw new Error("useCMS must be usedwithin CMSProvider")
    }

    return context
}

export default CMSContext
