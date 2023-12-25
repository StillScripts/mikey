import { type ClassValue, clsx } from 'clsx'
import { nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export type ActionStatus = { error?: boolean; success?: boolean }

export const getStatus = (status: 'success' | 'error'): ActionStatus => {
	switch (status) {
		case 'success':
			return { error: false, success: true }
		case 'error':
			return { error: true, success: false }
	}
}

export function generateBlockId(): string {
	return nanoid(10)
}
