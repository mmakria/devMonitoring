import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await User.create({
      fullName: 'Mohamed Makria',
      email: 'm.makria@gmail.com',
      password: 'Password123!',
    })
  }
}
