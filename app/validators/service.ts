import vine from '@vinejs/vine'

export const serviceValidation = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(30),
    url: vine.string().url().trim(),
    isActive: vine.boolean(),
  })
)

export const updateServiceValidation = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(30).optional(),
    url: vine.string().url().trim().optional(),
    isActive: vine.boolean().optional(),
  })
)
