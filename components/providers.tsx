'use client'
import { createContext, useContext } from 'react'
import { ThemeProvider } from 'next-themes'

export type EditorType = 'editor-js' | 'custom'

export const SettingsContext = createContext<
	{ defaultEditor: EditorType } | undefined
>(undefined)

export const useSettings = () => {
	const settings = useContext(SettingsContext)
	if (typeof settings === 'undefined') {
		throw new Error('Settings is undefined')
	}
	return settings
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="class">
			<SettingsContext.Provider value={{ defaultEditor: 'custom' }}>
				{children}
			</SettingsContext.Provider>
		</ThemeProvider>
	)
}
