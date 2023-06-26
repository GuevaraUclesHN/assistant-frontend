const { google } = require('googleapis');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' })

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
)

const insertEvent = async (event) => {
    try {
        const response = await calendar.events.insert(
            {
                auth: auth,
                calendarId: calendarId,
                resource: event
            }
        );

        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return "Evento agendado!!";
        }
        else {
            return "ERROR AY DIOS MIOOOOOO!!";
        }
    } catch (error) {
        console.log(`ERROR AT: `, error);
        return 0;
    }
};

//let dateTime = dateTimeForCalendar();

const insertNewEvent = async (_summary, _descp, _dateStart, _dateEnd) => {
    let event = {
        'summary': _summary,
        'description': _descp,
        'start': {
            'dateTime': _dateStart,
            'timeZone': 'America/Tegucigalpa'
        },
        'end': {
            'dateTime': _dateEnd,
            'timeZone': 'America/Tegucigalpa'
        }
    }

    try {
        const res = await insertEvent(event);
        console.log(res)
        return event
    } catch (error) {
        console.log(error);
    }
}

//insertNewEvent(`Entrega Proyecto`, `Mostrar proyecto final de vanguardia`, '2023-06-19T01:30:00.000', '2023-06-19T05:30:00.000');

const listEvents = async (timeStart, timeEnd) => {
    try {
        const response = await calendar.events.list(
            {
                auth: auth,
                calendarId: calendarId,
                timeMin: timeStart,
                timeMax: timeEnd,
                timeZone: 'America/Tegucigalpa'
            }
        );
        const items = response['data']['items'];
        return items;
    }
    catch (error) {
        console.log('ERROR AT: ', error)
        return 0;
    }
}

const _timemin = '2023-04-01T00:00:00.000Z';
const _timemax = '2023-07-01T00:00:00.000Z'

const getAllEvents = async (start, end) => {
    try {
        const res = await listEvents(start, end);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

getAllEvents(_timemin, _timemax)

const deleteEvent = async (eventId) => {
    try {
        const response = await calendar.events.delete(
            {
                auth: auth,
                calendarId: calendarId,
                eventId: eventId
            }
        );

        if (response.data === '') {
            return 'Evento Eliminado :(';
        }
        else {
            return 'Error al eliminar el evento :O!!';
        }
    } catch (error) {
        console.log('ERROR AT: ', error);
        return 0;
    }
}

const eventIdDelete = '6jn02gicce0ecen50olrsg8t3i';

const deleteSingleEvent = async (eventId) => {
    try {
        const res = await deleteEvent(eventId);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

//deleteSingleEvent(eventIdDelete)