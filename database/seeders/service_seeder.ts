import Service from '#models/service'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Service.create({ userId: 2, name: 'swakky', url: 'https://swakky.com', isActive: true })
  }
}
