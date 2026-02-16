import vine from '@vinejs/vine'

/**
 * Validates the register action
 */
export const registerValidation = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(4).maxLength(30),
    email: vine.string().email().trim(),
    password: vine.string().trim().minLength(8).maxLength(30),
  })
)

export const loginValidation = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().trim().minLength(8).maxLength(30),
  })
)
