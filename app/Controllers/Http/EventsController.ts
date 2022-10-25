import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Event from 'App/Models/Event'

export default class EventsController {
  public async index({ response }: HttpContextContract) {
    const events = await Database.from('events').select('events.*')
    return response.ok({ events })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const createEventSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(100)]),
      description: schema.string({ trim: true }, [rules.maxLength(100)]),
      event_time: schema.date({
        format: 'dd/MM/yyyy HH:mm',
      }),
      type: schema.string({ trim: true }, [rules.maxLength(50)]),
      locale: schema.string({ trim: true }, [rules.maxLength(50)]),
      image_url: schema.string({ trim: true }, [rules.maxLength(255), rules.url()]),
      duration: schema.string({ trim: true }, [rules.maxLength(10)]),
    })
    const payload: any = await request.validate({ schema: createEventSchema })
    payload.status = 'open'
    payload.creator_id = await auth.use('api').user?.$attributes.id
    const event: Event = await Event.create(payload)
    return response.created(event)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const event = await Event.find(id)
    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }
    return response.ok(event)
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    const createEventSchema = schema.create({
      title: schema.string.optional({ trim: true }, [rules.maxLength(100)]),
      description: schema.string.optional({ trim: true }, [rules.maxLength(100)]),
      event_time: schema.date.optional({
        format: 'dd/MM/yyyy HH:mm',
      }),
      type: schema.string.optional({ trim: true }, [rules.maxLength(50)]),
      locale: schema.string.optional({ trim: true }, [rules.maxLength(50)]),
      image_url: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.url()]),
      duration: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
      status: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
    })
    const payload: any = await request.validate({ schema: createEventSchema })
    const { id } = params
    const event = await Event.find(id)
    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }
    if (event.creatorId !== (await auth.use('api').user?.$attributes.id)) {
      return response.unauthorized({ message: 'You are not allowed to update this event!' })
    }
    event.title = payload?.title
    event.description = payload?.description
    event.event_time = payload?.event_time
    event.type = payload?.type
    event.locale = payload?.locale
    event.image_url = payload?.image_url
    event.duration = payload?.duration
    event.status = payload?.status

    await event.save()

    return response.ok(event)
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const { id } = params
    const event = await Event.find(id)
    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }
    if (event.creatorId !== (await auth.use('api').user?.$attributes.id)) {
      return response.unauthorized({ message: 'You are not allowed to update this event!' })
    }

    event.status = 'inactive'
    return response.ok({ message: 'Success! Event has been deleted' })
  }
}
