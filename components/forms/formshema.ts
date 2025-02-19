import {toTypedSchema} from '@vee-validate/zod'

import * as z from 'zod'

export const formSchema = toTypedSchema(z.object({
    username: z.string().min(5).max(16),
    password: z.string().min(8).max(16),
}))
