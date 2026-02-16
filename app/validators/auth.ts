import vine from '@vinejs/vine'

/**
 * Validates the register action
 */
export const registerValidation = vine.compile(
  vine.object({
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
