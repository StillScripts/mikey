import { type ClassValue, clsx } from 'clsx'
import { nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export type ActionStatus = {
	error?: boolean
	success?: boolean
	id?: string | null
}

export const getStatus = (
	status: 'success' | 'error',
	id?: string
): ActionStatus => {
	switch (status) {
		case 'success':
			return { error: false, success: true, id: id ?? null }
		case 'error':
			return { error: true, success: false, id: id ?? null }
	}
}

export function generateBlockId(): string {
	return nanoid(10)
}
