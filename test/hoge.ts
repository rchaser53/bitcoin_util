import test from 'ava'
import { asyncString } from './src/import'

test(async (t) => {
	t.is(await asyncString(), 'foob')
})
