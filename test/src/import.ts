export const asyncString = (): Promise<string> => {
	return new Promise((resolve, reject) => {
		resolve('sss')
	})
}
