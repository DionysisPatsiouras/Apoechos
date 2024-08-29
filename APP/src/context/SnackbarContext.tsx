'use client'
import React, { createContext, useState, useContext } from 'react'
import { Alert, Snackbar } from '@mui/material'


const SnackbarContext = createContext<any>(undefined)

const useSnackBarContext = (): any => {
    const [open, setOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const snackbar = (message: string) => {
        setMessage(message)
        setOpen(!open);
    }

    return {
        snackbar,
        open,
        setOpen,
        message
    }
}

export const SnackbarContextProvider = (props: { children: React.ReactNode }) => {
    const { children } = props
    const context = useSnackBarContext()

    return (
        <SnackbarContext.Provider value={context}>
            <>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={context.open}
                    onClose={() => context.setOpen(false)}
                    autoHideDuration={4000}
                    message={context.message}
                    key={'top' + 'center'}
                >
                    <Alert
                        onClose={() => context.setOpen(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%', bgcolor: '#4bb657', boxShadow: '0px 0px 6px -1px #808080' }}
                    >
                        {context.message}
                    </Alert>
                </Snackbar>
                {children}
            </>
        </SnackbarContext.Provider>
    );
}

// Custom hook to use the Snackbar context
export const useSnackbarContext = (): any => {
    const context = useContext(SnackbarContext)
    if (context === undefined) {
        throw new Error('useSnackbarContext must be used within a SnackbarContextProvider')
    }
    return context
}
