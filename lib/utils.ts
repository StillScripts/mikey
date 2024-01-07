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

/** Typesafe version of Object.keys */
export const getKeys = Object.keys as <T extends object>(
	obj: T
) => Array<keyof T>

/** Typesafe version of Object.keys */
export const getValues = Object.values as <T extends object>(
	obj: T
) => Array<T[keyof T]>

/** Extract common values from the ExerciseForm */
export function extractFormData<T extends string>(
	formData: FormData,
	keys: T[]
) {
	const data: Partial<Record<T, string>> = {}
	keys.forEach(key => {
		data[key] = formData.get(key) as string
	})
	return data as Record<T, string>
}
