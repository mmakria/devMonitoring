import vine from '@vinejs/vine'

export const serviceValidation = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(30),
    url: vine.string().url().trim(),
    isActive: vine.boolean(),
  })
)
